function testObjTrackingStop(t) {
  ServiceProcess.findOne({where: {workerId: 1}}, function(err, proc) {
    t.ifError(err);
    t.equal(proc.isTrackingObjects, false);
    t.end();
  });
}