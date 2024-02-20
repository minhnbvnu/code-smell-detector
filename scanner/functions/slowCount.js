function slowCount(value) {
    var count = 0;
    return new stream.Writable({
      objectMode: true,
      write: function (file, enc, cb) {
        if (typeof enc === 'function') {
          cb = enc;
        }

        count++;

        setTimeout(function () {
          cb(null, file);
        }, 250);
      },
      end: function (data, enc, cb) {
        expect(count).toEqual(value);
        cb();
      },
    });
  }