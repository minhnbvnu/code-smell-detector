function checkForExistingNrTraceHeaders(headers) {
  const traceparentHeader = headers[TRACE_CONTEXT_PARENT_HEADER]
  const newrelicHeader = headers[NEWRELIC_TRACE_HEADER]

  const hasExisting = traceparentHeader || newrelicHeader
  if (hasExisting) {
    logger.trace(MULTIPLE_INSERT_MESSAGE, traceparentHeader, newrelicHeader)
  }
}