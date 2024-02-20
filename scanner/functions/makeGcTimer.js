function makeGcTimer() {
    var timer = setInterval(gcLogger, exports.LOG_GC_INTERVAL_MS);
    timer.unref();
    return timer;
  }