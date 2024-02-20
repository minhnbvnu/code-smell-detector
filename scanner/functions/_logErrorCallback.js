function _logErrorCallback(error, phase) {
  if (error) {
    logger.error(error, `An error occurred during ${phase}`)
  }
}