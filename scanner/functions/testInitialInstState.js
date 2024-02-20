function testInitialInstState(t) {
  ServiceInstance.findOne(function(err, instance) {
    t.ifError(err);
    t.assert(instance.agentVersion, 'Agent version should be set');
    t.equal(instance.applicationName, 'test-app');
    t.assert(instance.containerVersionInfo, 'Container info should be set');
    t.equal(instance.restartCount, 0);
    t.equal(instance.setSize, 1);
    t.assert(instance.startTime, 'Start time should be set');
    t.equal(instance.started, true);
    t.end();
  });
}