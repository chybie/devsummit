import { spawn } from 'child_process';

export default async function postCSSBuild(inGlob, outPath, { watch } = {}) {
  const firstDir = inGlob.split('/')[0];
  const args = [inGlob, '--dir', outPath, '--base', firstDir];
  const options =
    process.platform === 'win32'
      ? { stdio: 'inherit', shell: true }
      : { stdio: 'inherit' };
  const proc = spawn('postcss', args, options);

  await new Promise(resolve => {
    proc.on('exit', code => {
      if (code !== 0) throw Error('postCSS build failed');
      resolve();
    });
  });

  if (watch) {
    spawn('postcss', [...args, '--watch'], options);
  }
}
