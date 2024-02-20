function redactValue(value) {
  const REDACT_VALUE = '****'

  let result = null
  if (Array.isArray(value)) {
    // Redact each value so we know if was configured and how many values
    result = value.map(() => REDACT_VALUE)
  } else {
    result = REDACT_VALUE
  }

  return result
}