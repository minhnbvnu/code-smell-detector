function concatString(fn, timeout) {
    var collect = '';
    return new stream.Writable({
      objectMode: true,
      write: function (chunk, enc, cb) {
        if (typeof enc === 'function') {
          cb = enc;
        }
        setTimeout(function () {
          collect = collect + chunk;
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