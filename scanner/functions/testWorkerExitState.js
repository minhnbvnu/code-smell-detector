function testWorkerExitState(t) {
  t.plan(7 + 1);
  server.once('exit', function() {
    ServiceProcess.findOne({where: {workerId: 1}}, function(err, proc) {
      t.ifError(err);
      t.equal(proc.isProfiling, false);
      t.equal(proc.isSnapshotting, false);
      t.equal(proc.isTrackingObjects, false);
      t.assert(proc.startTime, 'Start time should be set');
      t.assert(proc.stopTime, 'Stop time should be set');
      t.assert(proc.stopReason, 'Stop reason should be set');
    });
  });
  pmctl('set-size 1 0')(t, true);
}