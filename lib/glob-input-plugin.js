import { promisify } from 'util';
import path from 'path';

import glob from 'glob';

const globP = promisify(glob);

export default function globInputPlugin(...globInputs) {
  return {
    name: 'glob-input-plugin',
    async buildStartSequence(options) {
      const allPaths = await Promise.all(globInputs.map(g => globP(g)));
      const paths = [];
      for (const p of allPaths) paths.push(...p);
      const entries = paths.map(inputPath => [
        inputPath
          .split('/')
          .slice(1)
          .join('/')
          // Remove extension from name.
          // Otherwise, Rollup seems to branch on html/css vs js extensions.
          // This way we can normalise it.
          // It's added again in html-css-plugin's generateBundle.
          .replace(/\.[^\.]+$/, ''),
        inputPath,
      ]);

      options.input = { ...options.input, ...Object.fromEntries(entries) };
    },
  };
}
