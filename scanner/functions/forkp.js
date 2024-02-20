function forkp(program, args, opts) {
  return new Promise((resolve, reject) => {
    const proc = child.fork(program, args, opts);

    proc.on('error', error => {
      reject(error);
    });

    proc.on('close', exitCode => {
      resolve(exitCode);
    });
  });
}