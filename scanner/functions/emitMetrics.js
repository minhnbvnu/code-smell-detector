function emitMetrics() {
    debug('emit metrics');

    var req = {cmd: 'metrics', metrics: METRICS};
    runner.emit('request', req, checkMetrics);
  }