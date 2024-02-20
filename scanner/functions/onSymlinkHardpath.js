function onSymlinkHardpath(readlinkErr, path) {
      if (readlinkErr) {
        return callback(readlinkErr);
      }

      // Get target's stats
      fo.reflectStat(path, file, onReflect);
    }