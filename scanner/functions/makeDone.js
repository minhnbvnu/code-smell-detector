function makeDone(num) {
        return function done(err, result) {
          if (err) {
            return cb(err);
          }
          results[num] = result;
          if (--remaining == 0) {
            cb(null, results);
          }
        };
      }