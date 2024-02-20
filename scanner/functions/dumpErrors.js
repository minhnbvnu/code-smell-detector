function dumpErrors(errors, name) {
  let index = 1

  errors.forEach(function forEachError(error) {
    logger.trace(error, 'Error %s during %s:', index++, name)

    if (error.laterErrors) {
      error.laterErrors.forEach(function forEachLaterError(laterError) {
        logger.trace(laterError, 'Error %s during %s:', index++, name)
      })
    }
  })
}