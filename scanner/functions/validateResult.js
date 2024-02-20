function validateResult(result) {
  if (
    typeof result !== 'object' ||
    typeof result.pass !== 'boolean' ||
    (result.message &&
      (typeof result.message !== 'string' &&
        typeof result.message !== 'function'))
  ) {
    throw new Error(
      'Unexpected return from a matcher function.\n' +
        'Matcher functions should ' +
        'return an object in the following format:\n' +
        '  {message?: string | function, pass: boolean}\n' +
        `'${utils.stringify(result)}' was returned`
    )
  }
}