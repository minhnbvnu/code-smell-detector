function emitNewMetrics() {
    debug('emit new metrics');
    // Wait for MARGIN to cause last metrics to be outdated, then report empty
    // metrics to trigger the cleanup.
    var req = {cmd: 'metrics', metrics: {processes: {}}};
    setTimeout(function() {
      runner.emit('request', req, checkNewMetrics);
    }, MARGIN);
  }