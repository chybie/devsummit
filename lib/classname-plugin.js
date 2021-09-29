import { promises as fsp } from 'fs';
import { join } from 'path';

const defaultOpts = {
  prefix: 'classnames',
};

function hyphenToCamel(str) {
  return str
    .replace(/--\w/g, match => match[2].toUpperCase())
    .replace(/-\w/g, match => match[1].toUpperCase());
}

export default function(cssFileDir, opts = {}) {
  opts = Object.assign({}, defaultOpts, opts);
  if (!cssFileDir) {
    this.error('Must provide CSS file directory');
  }
  const PREFIX = opts.prefix + ':';

  return {
    name: 'classnames-loader',
    resolveId(source) {
      if (!source.startsWith(PREFIX)) {
        return;
      }
      // Don't do anything here
      return source;
    },
    async load(id) {
      if (!id.startsWith(PREFIX)) {
        return;
      }
      const path = id.slice(PREFIX.length);
      const realPath = join(cssFileDir, path) + '.json';
      const contents = await fsp.readFile(realPath, 'utf-8');
      const data = JSON.parse(contents);
      const outputExports = Object.entries(data).map(
        ([from, to]) => `export const ${hyphenToCamel(from)} = '${to}'`,
      );
      return outputExports.join(';');
    },
  };
}
