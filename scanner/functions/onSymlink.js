function onSymlink(symlinkErr) {
      if (symlinkErr) {
        return callback(symlinkErr);
      }

      fo.reflectLinkStat(file.path, file, onReflectLink);
    }