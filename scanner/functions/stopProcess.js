function stopProcess(proc, callback) {
    // Anything other than null, undefined, or '' is a reason.
    if (proc.stopReason != null && proc.stopReason !== '') {
      return callback();
    }
    debug('mark stopped: pid %j wid %j', proc.pid, proc.workerId);
    proc.stopReason = 'StrongLoop Process Manager was stopped';
    proc.stopTime = new Date();
    proc.save(callback);
  }