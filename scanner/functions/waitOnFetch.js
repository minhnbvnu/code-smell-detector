function waitOnFetch(srv, timeBudget, c) {
    var done = function () {
      srv.off("everythingFetched", done);
      clearTimeout(timeout);
      analyzeAll(srv, timeBudget, c);
    };

    srv.on("everythingFetched", done);
    var timeout = setTimeout(done, srv.options.fetchTimeout);
  }