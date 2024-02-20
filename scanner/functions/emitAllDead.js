function emitAllDead() {
    debug('emit all dead');
    var exit = {
      cmd: 'exit',
      id: 2,
      pid: 1002,
      reason: 5,
      suicide: false,
    };
    var status = {
      cmd: 'status',
      workers: [],
    };
    var expect = [{id: 1, pid: 1001}, {id: 2, pid: 1002}]; // XXX stopTime, etc.
    async.series([
      runner.emit.bind(runner, 'request', exit),
      runner.emit.bind(runner, 'request', status),
    ], checkWorkers.bind(null, expect, end));
  }