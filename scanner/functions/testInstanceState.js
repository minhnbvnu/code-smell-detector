function testInstanceState(expected) {
  return doTest;
  function doTest(t) {
    ServiceInstance.findOne(function(err, instance) {
      t.ifError(err);
      console.log('# testInstanceState: expected=%j:', expected, instance);
      t.equal(instance.started, expected);
      t.end();
    });
  }
}