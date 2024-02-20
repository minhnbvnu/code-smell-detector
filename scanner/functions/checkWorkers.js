function checkWorkers(expect, next) {
    m.ServiceProcess.find({order: 'workerId ASC'}, function(err, processes) {
      debug('processes: %j', err || processes);
      debug('expect: %j', expect);
      debug('next: %j', next.name);
      expect = expect.map(function(p) {
        return {
          serviceInstanceId: 1,
          workerId: p.id,
          pid: p.pid,
          // XXX start/stop time, etc.
        };
      });
      debug('expect: %j', expect);
      processes = processes.map(function(p) {
        return {
          serviceInstanceId: 1,
          workerId: p.id,
          pid: p.pid,
          // XXX start/stop time, etc.
        };
      });
      t.deepEqual(processes, expect);
      next();
    });
  }