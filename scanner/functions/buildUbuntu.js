function buildUbuntu(args, dependencies) {
  return _findModules(args).then((dependencies) => {
    return new Promise((resolve, reject) => {
      _findUbuntuModules(args, dependencies, resolve, reject);
    });
  }).then((ubuntuModules) => {
    return new Promise((resolve, reject) => {
      if (ubuntuModules && ubuntuModules.length > 0) {
        _buildModules(args, ubuntuModules, resolve, reject);
      } else {
        resolve();
      }
    });
  }).then(() => {
    return _buildApplication(args);
  });
}