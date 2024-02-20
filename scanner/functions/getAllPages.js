function getAllPages(cb, n, results) {
      if(!results) { results = []; }
      if(!n) { n = 0; }

      gh.issues.getComments({
        user: THREAD.user,
        repo: THREAD.repo,
        number: THREAD.number,
        page: n,
        per_page: 100, // jshint ignore:line

      }, function(err, res) {
        if(err || !res) { return cb(err); }

        results = results.concat(res);

        // if we got to the end of the results, return them
        if(res.length < 100) {
          return cb(null, results);
        }

        // otherwise keep getting more pages recursively
        getAllPages(cb, n+1, results);
      });
    }