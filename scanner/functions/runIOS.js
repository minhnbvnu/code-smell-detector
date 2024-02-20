function runIOS(argv, config) {
  return new Promise((resolve, reject) => {
    _runIOS(argv, config, resolve, reject);
    resolve();
  });
}