import { spawn } from 'child_process';
import { promisify } from 'util';

import glob from 'glob';

const globP = promisify(glob);

export default function eleventyPlugin() {
  return {
    name: '11ty-plugin',
    async buildStart() {
      const files = await globP('src/**/*.{njk,md}', { nodir: true });
      for (const file of files) this.addWatchFile(file);
    },
    async buildStartSequence() {
      const options =
        process.platform === 'win32'
          ? { stdio: 'inherit', shell: true }
          : { stdio: 'inherit' };
      const proc = spawn('eleventy', options);

      await new Promise((resolve, reject) => {
        proc.on('exit', code => {
          if (code !== 0) {
            reject(Error('Eleventy build failed'));
          } else {
            resolve();
          }
        });
      });
    },
  };
}
