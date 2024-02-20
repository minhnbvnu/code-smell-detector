function rename(filepath) {
    return new stream.Transform({
      objectMode: true,
      transform: function (file, enc, cb) {
        if (typeof enc === 'function') {
          cb = enc;
        }

        file.path = filepath;
        cb(null, file);
      },
    });
  }