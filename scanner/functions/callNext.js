function callNext() {
        if (remaining.length == 0) return cb(null, results);
        var promise = remaining.shift()(next);
        if (promise && typeof promise.then == "function") {
          promise.then(buster.partial(next, null), next);
        }
      }