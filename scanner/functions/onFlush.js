function onFlush(fd, callback) {
    // TODO: this is doing sync stuff & the callback seems unnecessary
    readStream(file, { resolve: resolve }, complete);

    function resolve(key) {
      if (key === 'encoding') {
        return encoding;
      }
      if (key === 'removeBOM') {
        return false;
      }
      throw new Error("Eek! stub resolver doesn't have " + key);
    }

    function complete() {
      if (typeof fd !== 'number') {
        return callback();
      }

      fo.updateMetadata(fd, file, callback);
    }
  }