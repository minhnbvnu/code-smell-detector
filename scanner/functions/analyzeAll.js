function analyzeAll(srv, timeBudget, c) {
    if (srv.pending) return waitOnFetch(srv, timeBudget, c);
    var e = srv.fetchError;

    if (e) {
      srv.fetchError = null;
      return c(e);
    }

    if (srv.needsPurge.length > 0) infer.withContext(srv.cx, function () {
      infer.purge(srv.needsPurge);
      srv.needsPurge.length = 0;
    });
    var done = true; // The second inner loop might add new files. The outer loop keeps
    // repeating both inner loops until all files have been looked at.

    for (var i = 0; i < srv.files.length;) {
      var toAnalyze = [];

      for (; i < srv.files.length; ++i) {
        var file = srv.files[i];
        if (file.text == null) done = false;else if (file.scope == null && !file.excluded) toAnalyze.push(file);
      }

      toAnalyze.sort(function (a, b) {
        return parentDepth(srv, a.parent) - parentDepth(srv, b.parent);
      });

      for (var j = 0; j < toAnalyze.length; j++) {
        var file = toAnalyze[j];

        if (file.parent && !chargeOnBudget(srv, file)) {
          file.excluded = true;
        } else if (timeBudget) {
          var startTime = +new Date();

          try {
            infer.withTimeout(timeBudget[0], function () {
              analyzeFile(srv, file);
            });
          } catch (e) {
            if (e instanceof infer.TimedOut) return c(e);else throw e;
          }

          timeBudget[0] -= +new Date() - startTime;
        } else {
          analyzeFile(srv, file);
        }
      }
    }

    if (done) c();else waitOnFetch(srv, timeBudget, c);
  }