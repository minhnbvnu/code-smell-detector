function gcLogger() {
    var overflow = logger.length - exports.MAX_LOG_RETENTION_BYTES;
    if (overflow > 0) {
      logger.consume(overflow);
    }
  }