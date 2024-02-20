function maybeAddStackTrace(exception, config) {
  const stack = exception.error?.stack
  let parsedStack

  if (stack) {
    parsedStack = ('' + stack).split(/[\n\r]/g)

    if (config.high_security || config.strip_exception_messages.enabled) {
      parsedStack[0] = exception.error.name + ': <redacted>'
    }
  }

  return parsedStack
}