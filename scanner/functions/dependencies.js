function dependencies(argv, config, packagerInstance) {
  return new Promise((resolve, reject) => {
    _dependencies(argv, config, resolve, reject, packagerInstance);
  });
}