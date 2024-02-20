function getFirstErrorCustomAttributes(aggregator, t) {
  return getFirstError(aggregator, t)[4].userAttributes
}