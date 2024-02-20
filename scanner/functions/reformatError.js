function reformatError(logLine) {
  logLine['error.message'] = truncate(logLine.err.message)
  logLine['error.stack'] = truncate(logLine.err.stack)
  logLine['error.class'] = logLine.err.type
  delete logLine.err
}