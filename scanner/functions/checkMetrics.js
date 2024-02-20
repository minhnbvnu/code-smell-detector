function checkMetrics() {
    function checkMetric(wid, callback) {
      var metric = METRICS.processes[wid];
      wid = Number(wid);
      debug('check metric for %d:', wid, metric);
      // Note that lib/server mutates metrics during request handling... which
      // it is allowed to do, but what we see below is not exactly the same
      // as the metrics message seen above.
      m.ServiceMetric.findOne({where: {workerId: wid}}, function(err, obj) {
        debug('found metric for %d:', wid, err || obj);
        assert.equal(obj.workerId, wid);
        assert.equal(String(obj.timeStamp),
                     String(new Date(METRICS.timestamp)));
        t.deepEqual(obj.timers, metric.timers);
        t.deepEqual(obj.gauges, metric.gauges);
        t.deepEqual(obj.counters, metric.counters);
        m.ServiceProcess.findById(obj.processId, function(err, proc) {
          t.ifError(err);
          t.ok(!proc.stopReason, 'Stop reason should be unset');
          callback();
        });
      });
    }
    async.each(['1'], checkMetric, emitNewMetrics);
    // FIXME 0 doesn't pass, because it has no Process, because the master
    // isn't forked :-(
    // async.each(Object.keys(METRICS.processes), checkMetric, end);
  }