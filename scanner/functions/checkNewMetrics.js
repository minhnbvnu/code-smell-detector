function checkNewMetrics() {
    m.ServiceMetric.count(/* where, */function(er, count) {
      assert.ifError(er);
      t.equal(count, 0, 'old should be deleted');
      end();
    });
  }