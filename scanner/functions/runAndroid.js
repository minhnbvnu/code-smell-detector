function runAndroid(argv, config) {
  return new Promise((resolve, reject) => {
    _runAndroid(argv, config, resolve, reject);
  });
}