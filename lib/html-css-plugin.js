import fs from 'fs';
import { join, relative, resolve, parse } from 'path';

import { minify as minifyHTML } from 'html-minifier';
import requireFromString from 'require-from-string';
import escapeRE from 'escape-string-regexp';

const { path: urlPrefix } = require('./confbox.config.js');

const contentStart = '£££CONTENTSTART';
const contentEnd = '£££CONTENTEND';
const contentStrRE = new RegExp(
  `['"]${escapeRE(contentStart)}[\\w\\W]*${escapeRE(contentEnd)}['"]`,
);
const contentRE = new RegExp(
  `${escapeRE(contentStart)}([\\w\\W]*)${escapeRE(contentEnd)}`,
);
const importMetaStart = '#';
const importMetaEnd = '#';
const importMetaRE = new RegExp(
  escapeRE(importMetaStart) +
    '(import.meta.ROLLUP_.*?)' +
    escapeRE(importMetaEnd),
  'g',
);
///#(import.meta.ROLLUP_[^#]+)#/g
/**
 * When given a path like /foo/bar.jpg, it'll look for it in .build-tmp first, then fall back to src
 * if it doesn't exist in .build-tmp
 *
 * @param {string} path
 */
function getAsset(path) {
  try {
    return fs.readFileSync(join('.build-tmp', path));
  } catch (err) {
    return fs.readFileSync(join('src', path));
  }
}

/**
 * Turns a relative URL or absolute URL (starting /) into a path within .build-tmp.
 *
 * @param {string} filePath
 * @param {string} parentPath
 */
function assetURLToPath(filePath, parentPath) {
  if (filePath.startsWith('/')) return filePath.slice(1);
  const parentDir = parse(parentPath).dir;
  const resolvedPath = resolve(parentDir, ...filePath.split('/'));

  return relative('.build-tmp', resolvedPath);
}

const defaultOptions = {
  htmlMinify: {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
  },
};

export default function htmlCSSPlugin(userOptions = {}) {
  let assetCache;
  let nonJSChunks;
  const options = { ...defaultOptions, ...userOptions };

  function processContent(rollup, filePath) {
    let content = fs.readFileSync(filePath, { encoding: 'utf8' });

    // Find assets
    content = content.replace(
      /confboxAsset\((['"]?)(.*?)\1\)/g,
      (fullMatch, quote, path) => {
        // Get path starting from .build-tmp (or src)
        const targetPath = assetURLToPath(path, filePath);

        // js, css, and html becomes a chunk
        if (/\.(jsx?|css|html|json)$/.test(targetPath)) {
          // We get css and html from .build-tmp, js comes from src.
          const isJS = /\.jsx?$/.test(targetPath);
          const inSrc = isJS || /\.json$/.test(targetPath);
          const parentDir = inSrc ? 'src' : '.build-tmp';
          const moduleId = join(parentDir, targetPath);

          if (!isJS) {
            // Cache name, so we know what to handle in load & generateBundle
            nonJSChunks.add(join(process.cwd(), moduleId));
          }

          const id = rollup.emitChunk(moduleId, {
            // Remove extension from name.
            // Otherwise, Rollup seems to branch on html/css vs js extensions.
            // This way we can normalise it & add it again in generateBundle.
            name: targetPath.replace(/\.[^\.]+$/, ''),
          });

          // This will be replaced with the real URL in generateBundle.
          return `${importMetaStart}import.meta.ROLLUP_CHUNK_URL_${id}${importMetaEnd}`;
        }

        // This lets us dedupe assets.
        // We don't need this once https://github.com/rollup/rollup/issues/2959 lands.
        if (!assetCache.has(targetPath)) {
          const source = getAsset(targetPath);
          const id = rollup.emitAsset(targetPath, source);
          assetCache.set(targetPath, id);
        }

        // This will be replaced with the real URL in generateBundle.
        return `${importMetaStart}import.meta.ROLLUP_ASSET_URL_${assetCache.get(
          targetPath,
        )}${importMetaEnd}`;
      },
    );

    return content;
  }

  return {
    name: 'html-css-plugin',
    async buildStart() {
      assetCache = new Map();
      nonJSChunks = new Set([join(process.cwd(), '.build-tmp/manifest.json')]);
    },
    load(id) {
      // We treat HTML and CSS as chunks so we can express a dependency tree.
      // We won't need to do this once https://github.com/rollup/rollup/issues/2823 lands.
      if (!(id.endsWith('.html') || nonJSChunks.has(id))) return;
      // We've already added CSS to nonJSChunks, but we need to add the HTML too:
      nonJSChunks.add(id);
      const content = processContent(this, id);
      // Turn the content into a JS string.
      // Break the import.meta.ROLLUP_ parts out of the string, so Rollup replaces them.
      const jsContent = JSON.stringify(
        contentStart + content + contentEnd,
      ).replace(importMetaRE, '"+$1+"');
      // Export as a module. It's un-moduled in generateBundle.
      return `export default ${jsContent};`;
    },
    generateBundle(_, bundle) {
      const renames = new Map();

      for (const [key, item] of Object.entries(bundle)) {
        // Skip entries we don't care about.
        if (!nonJSChunks.has(item.facadeModuleId)) continue;

        // Extract the content string from the module.
        const codeReResult = contentStrRE.exec(item.code);
        if (!codeReResult) {
          throw Error(`Cannot find module content for: ${key}`);
        }

        // Parse the string as JavaScript.
        const codeStr = requireFromString(
          `module.exports = ${codeReResult[0]}`,
        );

        // Extract the content.
        item.code = contentRE.exec(codeStr)[1];

        // Replace the JS extension with the real extension.
        const destFileName = item.fileName.replace(
          /\.jsx?$/i,
          /\.[^\.]+$/.exec(item.facadeModuleId)[0],
        );
        delete bundle[key];
        item.fileName = destFileName;
        bundle[destFileName] = item;
        renames.set(key, item.fileName);

        // Minify HTML
        if (item.facadeModuleId.endsWith('.html') && options.htmlMinify) {
          item.code = minifyHTML(item.code, options.htmlMinify);
        }
      }

      // Rename references, now we've renamed some files.
      for (const [from, to] of renames) {
        // Silly hack to stop it renaming /manifest.json to /manifest.jsonon
        if (from.endsWith('manifest.js')) continue;
        const fromRE = new RegExp(escapeRE(from), 'g');
        for (const item of Object.values(bundle)) {
          if (item.isAsset) continue;
          item.code = item.code.replace(fromRE, to);
        }
      }

      // Handle inlining
      for (const item of Object.values(bundle)) {
        // Skip entries we don't care about.
        if (!nonJSChunks.has(item.facadeModuleId)) continue;

        item.code = item.code.replace(
          /confboxInline\((['"]?)(.*?)\1\)/g,
          (fullMatch, quote, path) => bundle[path.slice(urlPrefix.length)].code,
        );
      }
    },
  };
}
