function testRestartedInstState(t) {
  ServiceInstance.findOne(function(err, instance) {
    t.ifError(err);
    t.equal(instance.restartCount, 1);
    t.end();
  });
}