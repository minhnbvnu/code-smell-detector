function onReflectLink(reflectErr) {
      if (reflectErr) {
        return callback(reflectErr);
      }

      callback(null, file);
    }