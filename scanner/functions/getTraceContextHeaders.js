function getTraceContextHeaders(transaction) {
  const headers = {}
  transaction.traceContext.addTraceContextHeaders(headers)
  return headers
}