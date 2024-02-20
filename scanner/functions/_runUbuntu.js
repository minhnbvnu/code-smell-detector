function _runUbuntu(args, config) {
  return new Promise((resolve, reject) => {
    resolve(isPackagerRunning().then(result => {
      if (result === 'running') {
        console.log(chalk.bold('JS server already running.'));
      } else if (result === 'unrecognized') {
        console.warn(chalk.yellow('JS server not recognized, continuing with build...'));
      } else {
        // result == 'not_running'
        console.log(chalk.bold('Starting JS server...'));
        startServerInNewWindow();
      }
      actuallyRun(args, reject);
    }));
  });
}