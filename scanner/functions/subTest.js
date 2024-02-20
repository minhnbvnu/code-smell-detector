function subTest(name, opts, cb) {
    if (!cb && typeof opts === 'function') {
      cb = opts;
      opts = {};
    }
    queue.push(function(next) {
      t.test(name, function(subT) {
        var subQueued = queued(subT);
        subT.on('end', next);
        cb(subQueued);
        runTests(subQueued.queue, subT);
      });
    });
  }