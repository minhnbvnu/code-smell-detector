function getResultLevel(message) {
  if (message.fatal || message.severity === 2) {
    return 'error'
  }
  return 'warning'
}