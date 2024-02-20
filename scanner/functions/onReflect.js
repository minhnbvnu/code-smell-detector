function onReflect(statErr) {
      if (statErr) {
        return callback(statErr);
      }

      if (!file.stat.isSymbolicLink()) {
        return callback(null, file);
      }

      var resolveSymlinks = optResolver.resolve('resolveSymlinks', file);

      if (!resolveSymlinks) {
        return callback(null, file);
      }

      fo.findSymlinkHardpath(file.path, onSymlinkHardpath);
    }