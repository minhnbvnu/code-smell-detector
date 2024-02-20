function emitOneDead() {
    debug('emit one dead');
    var exit = {
      cmd: 'exit',
      id: 1,
      pid: 1001,
      reason: 'SIGTERM',
      suicide: false,
    };
    var status = {
      cmd: 'status',
      workers: [{id: 2, pid: 1002}],
    };
    var expect = [{id: 1, pid: 1001}, {id: 2, pid: 1002}]; // XXX stopTime, etc.
    async.series([
      runner.emit.bind(runner, 'request', exit),
      runner.emit.bind(runner, 'request', status),
    ], checkWorkers.bind(null, expect, emitAllDead));
  }