function stopStaleProcesses(err) {
    if (err) return callback(err);
    Process.find(function(err, procs) {
      if (err) return callback(err);
      async.each(procs, stopProcess, callback);
    });
  }