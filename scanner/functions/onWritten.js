function onWritten(writeErr) {
      var flags = fo.getFlags({
        overwrite: optResolver.resolve('overwrite', file),
        append: optResolver.resolve('append', file),
      });
      if (fo.isFatalOverwriteError(writeErr, flags)) {
        return callback(writeErr);
      }

      callback(null, file);
    }