function reformatTimestamp(logLine) {
  if (logLine.timestamp) {
    logger.traceOnce(
      'Overwriting `timestamp` key; assigning original value to `original_timestamp`.'
    )
    logLine.original_timestamp = logLine.timestamp
  }
  logLine.timestamp = Date.now()
}