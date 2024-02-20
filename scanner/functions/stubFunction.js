function stubFunction(name) {
  return eval(
    '(function () {return function ' +
      name +
      '() {' +
      "logger.debug('Not calling " +
      name +
      " because New Relic is disabled.');" +
      '}}())'
  )
}