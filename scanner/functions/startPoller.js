function startPoller(interval, setTimeout) {
    (function check() {
      forEach(pollFns, function(pollFn) { pollFn(); });
      pollTimeout = setTimeout(check, interval);
    })();
  }