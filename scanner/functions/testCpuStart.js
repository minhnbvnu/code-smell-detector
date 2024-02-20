function testCpuStart(t) {
  ServiceProcess.findOne({where: {workerId: 1}}, function(err, proc) {
    t.ifError(err);
    t.assert(proc, 'worker 1 exists');
    t.equal(proc.isProfiling, true, 'worker 1 is profiling');
    t.end();
  });
}