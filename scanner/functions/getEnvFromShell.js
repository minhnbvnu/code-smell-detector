async function getEnvFromShell(env) {
  let { stdout, error } = await new Promise(resolve => {
    let child;
    let error;
    let stdout = '';
    let done = false;
    const cleanup = () => {
      if (!done && child) {
        child.kill();
        done = true;
      }
    };
    process.once('exit', cleanup);
    setTimeout(() => {
      cleanup();
    }, 5000);
    child = childProcess.spawn(env.SHELL, ['-ilc', ENV_COMMAND], {
      encoding: 'utf8',
      detached: true,
      stdio: ['ignore', 'pipe', process.stderr]
    });
    const buffers = [];
    child.on('error', e => {
      done = true;
      error = e;
    });
    child.stdout.on('data', data => {
      buffers.push(data);
    });
    child.on('close', (code, signal) => {
      done = true;
      process.removeListener('exit', cleanup);
      if (buffers.length) {
        stdout = Buffer.concat(buffers).toString('utf8');
      }

      resolve({ stdout, error });
    });
  });

  if (error) {
    if (error.handle) {
      error.handle();
    }
    console.log(
      'warning: ' +
        env.SHELL +
        ' -ilc "' +
        ENV_COMMAND +
        '" failed with signal (' +
        error.signal +
        ')'
    );
    console.log(error);
  }

  if (!stdout || stdout.trim() === '') {
    return null;
  }

  let result = {};
  for (let line of stdout.split('\0')) {
    if (line.includes('=')) {
      let components = line.split('=');
      let key = components.shift();
      let value = components.join('=');
      result[key] = value;
    }
  }
  return result;
}