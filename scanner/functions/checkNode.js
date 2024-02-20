function checkNode(base, target, settings) {
    Object.keys(settings).forEach(checkKey.bind(null, base, target, settings))
  }