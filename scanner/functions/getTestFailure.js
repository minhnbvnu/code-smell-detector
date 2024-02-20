function getTestFailure(err) {
  let testFailure
  if (err instanceof Error) {
    testFailure = {
      message: err.message,
      name: err.name,
      stack: prepareStackTrace(err.stack || ''),
    }
    if (err.actual) {
      testFailure.actual = err.actual
      testFailure.expected = err.expected
      testFailure.operator = err.operator
    }
    if (err.nativeException) {
      testFailure.message += ' '
      testFailure.message += String(err.nativeException.reason())
    }
  } else if (err.reason && err.name) {
    testFailure = {
      message: String(err.reason()),
      name: String(err.name()),
    }
  } else {
    testFailure = err
  }
  return testFailure
}