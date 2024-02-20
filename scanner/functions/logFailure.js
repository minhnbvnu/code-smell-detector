function logFailure(endpoint, code, action) {
  logger.error('Agent endpoint %s returned %s status. %s.', endpoint, code, action)
}