function spawnp(program, args, opts) {
  return new Promise((resolve, reject) => {
    const proc = child.spawn(program, args, opts);

    proc.on('error', error => {
      reject(error);
    });

    proc.on('close', exitCode => {
      resolve(exitCode);
    });
  });
}