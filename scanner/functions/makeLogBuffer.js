function makeLogBuffer() {
  var logger = bl();

  logger.enableGC = function() {
    logger._logGcTimer = logger._logGcTimer || makeGcTimer();
  };

  logger.dump = function() {
    var logDump = logger.duplicate().toString();
    logger.consume(logDump.length);
    return logDump;
  };

  logger.on('end', function() {
    if (logger._logGcTimer) {
      clearInterval(logger.logGcTimer);
      logger._logGcTimer = null;
    }
  });

  return logger;

  function gcLogger() {
    var overflow = logger.length - exports.MAX_LOG_RETENTION_BYTES;
    if (overflow > 0) {
      logger.consume(overflow);
    }
  }

  function makeGcTimer() {
    var timer = setInterval(gcLogger, exports.LOG_GC_INTERVAL_MS);
    timer.unref();
    return timer;
  }
}