function getFirstError(aggregator, t) {
  const errors = getErrorTraces(aggregator)
  t.equal(errors.length, 1)
  return errors[0]
}