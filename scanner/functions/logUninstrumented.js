function logUninstrumented() {
  const modules = Object.keys(uninstrumented)
  if (modules.length > 0) {
    let message =
      'The newrelic module must be the first module required.\n' +
      'The following modules were required before newrelic and are not being ' +
      'instrumented:'

    modules.forEach(function buildMessage(module) {
      message += '\n\t' + uninstrumented[module].name + ': ' + uninstrumented[module].filename
    })

    logger.warn(message)
  }
}