function addDTHeaders({ transaction, config, request }) {
  const outboundHeaders = Object.create(null)
  synthetics.assignHeadersToOutgoingRequest(config, transaction, outboundHeaders)

  if (config.distributed_tracing.enabled) {
    transaction.insertDistributedTraceHeaders(outboundHeaders)
  } else if (config.cross_application_tracer.enabled) {
    cat.addCatHeaders(config, transaction, outboundHeaders)
  } else {
    logger.trace('Both DT and CAT are disabled, not adding headers!')
  }

  // eslint-disable-next-line guard-for-in
  for (const key in outboundHeaders) {
    request.addHeader(key, outboundHeaders[key])
  }
}