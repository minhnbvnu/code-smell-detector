function _requestAllPages(path, cb) {
      var results = [];
      (function iterate() {
        _request("GET", path, null, function(err, res, xhr) {
          if (err) {
            return cb(err);
          }

          results.push.apply(results, res);

          var links = (xhr.getResponseHeader('link') || '').split(/\s*,\s*/g),
              next = _.find(links, function(link) { return /rel="next"/.test(link); });

          if (next) {
            next = (/<(.*)>/.exec(next) || [])[1];
          }

          if (!next) {
            cb(err, results);
          } else {
            path = next;
            iterate();
          }
        });
      })();
    }