function testInitialWorkerState(t) {
  ServiceProcess.findOne({where: {workerId: 1}}, function(err, proc) {
    t.ifError(err);
    t.equal(proc.isProfiling, false);
    t.equal(proc.isSnapshotting, false);
    t.equal(proc.isTrackingObjects, false);
    t.assert(proc.startTime, 'Start time should be set');
    t.assert(!proc.stopTime, 'Stop time should not be set');
    t.assert(!proc.stopReason, 'Stop reason should not be set');
    t.end();
  });
}