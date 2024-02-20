function getMessage(message) {
  return (message && message()) || 'No message was specified for this matcher.'
}