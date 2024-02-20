function waitForWorkers(t) {
  waitForWorkers.count = waitForWorkers.count || 0;
  waitForWorkers.count += 1;
  ServiceProcess.find(function(err, procs) {
    console.log('# checked %d times on wait for worker', waitForWorkers.count);
    // supervisor + workers
    if (procs.length > 1) {
      return t.end();
    } else if (waitForWorkers.count > 20) {
      t.ifError(err);
      t.fail('no workers');
      return t.end();
    } else {
      return setTimeout(waitForWorkers.bind(null, t), 100);
    }
  });
}