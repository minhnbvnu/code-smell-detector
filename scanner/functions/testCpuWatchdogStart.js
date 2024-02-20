function testCpuWatchdogStart(t) {
  ServiceProcess.findOne({where: {workerId: 1, stopTime: null}},
    function(err, proc) {
      t.ifError(err);
      t.equal(proc.isProfiling, true);
      t.equal(proc.watchdogTimeout, 1000);
      t.end();
    }
  );
}