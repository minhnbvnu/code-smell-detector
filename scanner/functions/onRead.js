function onRead(readErr) {
      if (readErr) {
        return callback(readErr);
      }
      callback(null, file);
    }