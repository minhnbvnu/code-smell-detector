function library(argv, config) {
  return new Promise((resolve, reject) => {
    _library(argv, config, resolve, reject);
  });
}