function logTo(logFn) {
    return log;

    function log() {
      var msg = fmt.apply(null, arguments);
      logFn('pm:docker: ' + msg);
    }
  }