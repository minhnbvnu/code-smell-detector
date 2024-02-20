function concatBuffer(fn, timeout) {
    var collect = Buffer.alloc(0);
    return new stream.Writable({
      objectMode: true,
      write: function (chunk, enc, cb) {
        if (typeof enc === 'function') {
          cb = enc;
        }
        setTimeout(function () {
          collect = Buffer.concat([collect, chunk]);
          cb();
        }, timeout || 1);
      },
      final: function (cb) {
        if (typeof fn === 'function') {
          fn(collect);
        }

        cb();
      },
    });
  }