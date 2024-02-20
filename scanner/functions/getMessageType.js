function getMessageType(message) {
  if (message.fatal || message.severity === 2) {
    return 'Error'
  }
  return 'Warning'
}