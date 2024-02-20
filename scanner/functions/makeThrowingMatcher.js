function makeThrowingMatcher(matcher, isNot, actual) {
  return function throwingMatcher(...args) {
    let throws = true
    const matcherContext = Object.assign(
      // When throws is disabled, the matcher will not throw errors during test
      // execution but instead add them to the global matcher state. If a
      // matcher throws, test execution is normally stopped immediately. The
      // snapshot matcher uses it because we want to log all snapshot
      // failures in a test.
      {
        dontThrow: () => {
          throws = false
        },
      },
      getState(),
      {
        isNot,
        utils,
      }
    )
    let result

    try {
      result = matcher.apply(matcherContext, [actual].concat(args))
    } catch (error) {
      throw error
    }

    validateResult(result)

    getState().assertionCalls += 1

    // XOR
    if ((result.pass && isNot) || (!result.pass && !isNot)) {
      const message = getMessage(result.message)
      const error = new Error(message)
      // Passing the result of the matcher with the error so that a custom
      // reporter could access the actual and expected objects of the result
      // for example in order to display a custom visual diff
      error.matcherResult = result
      // Try to remove this function from the stack trace frame.
      // Guard for some environments (browsers) that do not support this feature.
      if (Error.captureStackTrace) {
        Error.captureStackTrace(error, throwingMatcher)
      }

      if (throws) {
        throw error
      } else {
        getState().suppressedErrors.push(error)
      }
    }
  }
}