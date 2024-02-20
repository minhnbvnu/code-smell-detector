function compareContents(comparator) {
    return new stream.Transform({
      objectMode: true,
      transform: function (file, enc, cb) {
        if (typeof enc === 'function') {
          cb = enc;
        }
        stream.pipeline(
          [file.contents, concatBuffer(comparator)],
          function (err) {
            cb(err, file);
          }
        );
      },
    });
  }