function setupHandlers(binPath) {
  Tester.addHandler("icaljs", function(rule, dtstart, max, callback) {
    var iter = rule.iterator(dtstart);
    var occ = 0;
    var start = new Date();

    var results = [];
    (function loop() {
      var next, diff;

      if (++occ > max) {
        return callback(results);
      }

      try {
        next = iter.next();
      } catch (e) {
        return callback(e.message || e);
      }

      if (next) {
        results.push(next.toICALString());
      } else {
        return callback(results);
      }

      diff = (new Date() - start) / 1000;
      if (diff > Tester.MAX_EXECUTION_TIME) {
        return callback("Maximum execution time exceeded");
      }

      setImmediate(loop);
    })();
  });

  Tester.addHandler("other", function(rule, dtstart, max, callback) {
    var results = [];
    var ptimer = null;
    var recur = spawn(binPath, [rule.toString(), dtstart.toICALString(), max]);

    recur.stdout.on('data', function(data) {
      Array.prototype.push.apply(results, data.toString().split("\n").slice(0, -1));
    });

    recur.on('close', function(code) {
      if (ptimer) {
        clearTimeout(ptimer);
      }

      if (code === null) {
        callback("Maximum execution time exceeded");
      } else if (code !== 0) {
        callback("Execution error: " + code);
      } else {
        callback(null, results);
      }
    });

    ptimer = setTimeout(function() {
      ptimer = null;
      recur.kill();
    }, Tester.MAX_EXECUTION_TIME);
  });
}