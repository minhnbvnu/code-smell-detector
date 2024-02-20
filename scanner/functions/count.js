function count(value) {
    var count = 0;
    return new stream.Transform({
      objectMode: true,
      transform: function (file, enc, cb) {
        if (typeof enc === 'function') {
          cb = enc;
        }

        count++;
        cb(null, file);
      },
      flush: function (cb) {
        expect(count).toEqual(value);
        cb();
      },
    });
  }