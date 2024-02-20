function getLogLevel(level) {
  if (!level) {
    return LOGGING.LEVELS.UNKNOWN
  }
  const logLevel = LOGGING.LEVELS[level.toUpperCase()]
  if (!logLevel) {
    return LOGGING.LEVELS.UNKNOWN
  }
  return logLevel
}