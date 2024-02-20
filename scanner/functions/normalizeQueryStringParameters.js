function normalizeQueryStringParameters(event) {
  if (!event.multiValueQueryStringParameters) {
    return event.queryStringParameters
  }
  return Object.fromEntries(
    Object.entries(event.multiValueQueryStringParameters).map(([param, value]) => {
      if (Array.isArray(value)) {
        return [param, value.join(',')]
      }
      return [param, value]
    })
  )
}