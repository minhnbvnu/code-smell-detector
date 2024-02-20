function hasValidRegisterOptions(opts) {
  if (!opts) {
    logger.warn('Instrumentation registration failed, no options provided')
    return false
  }

  if (!opts.moduleName) {
    logger.warn(`Instrumentation registration failed, 'moduleName' not provided`)
    return false
  }

  if (!opts.onRequire) {
    logger.warn(
      'Instrumentation registration for %s failed, no require hooks provided.',
      opts.moduleName
    )

    return false
  }

  return true
}