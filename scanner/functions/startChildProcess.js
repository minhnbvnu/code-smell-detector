async function startChildProcess(name, args, logger) {
  return new Promise((resolve, reject) => {
    const processName = getProcessName(name);
    logger.info(`Using ${name} in path ${processName}`);
    const childProcess = cp.spawn(processName, args);
    childProcess.stdout.on('data', data => {
      logger.info(`${name}: ${data}`);
      resolve(childProcess);
    });
    childProcess.stderr.on('data', data => {
      logger.error(`${name} Error: ${data}`);
      reject(new Error(data));
    });
    childProcess.on('error', reject);
  });
}