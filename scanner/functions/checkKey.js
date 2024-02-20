function checkKey(base, target, settings, key) {
    const hsValue = settings[key]

    if (hsValue && typeof hsValue === 'object' && !(hsValue instanceof Array)) {
      if (typeof target[key] !== 'object') {
        logger.warn('High Security Mode: %s should be an object, found %s', key, target[key])
        target[key] = Object.create(null)
      }

      return checkNode(base + key + '.', target[key], hsValue)
    }

    if (target[key] !== hsValue) {
      logger.warn('High Security Mode: %s was set to %s, coercing to %s', key, target[key], hsValue)
      target[key] = hsValue
      config.emit(base + key, hsValue)
    }
  }