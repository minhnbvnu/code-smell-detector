function testCpuStop(t) {
  ServiceProcess.findOne({where: {workerId: 1, stopTime: null}},
    function(err, proc) {
      t.ifError(err);
      t.equal(proc.isProfiling, false);
      t.end();
    }
  );
}