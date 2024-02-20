function testTotalWorkers(count) {
  return testCount;

  function testCount(t) {
    ServiceProcess.find(function(err, procs) {
      t.ifError(err);
      t.equal(procs.length, count);
      t.end();
    });
  }
}