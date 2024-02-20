function createHeadersAndInsertTrace(transaction) {
  const headers = {}
  transaction.insertDistributedTraceHeaders(headers)

  return headers
}