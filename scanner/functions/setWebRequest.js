function setWebRequest(shim, transaction, request) {
  transaction.type = shim.WEB

  const segment = transaction.baseSegment

  transaction.url = urltils.scrub(request.url.path)
  transaction.verb = request.method
  transaction.trace.attributes.addAttribute(
    ATTR_DEST.TRANS_COMMON,
    'request.method',
    request.method
  )

  segment.addSpanAttribute('request.method', request.method)

  transaction.port = request.url.port

  // These are only query parameters, from lib/serverless/api-gateway.js
  transaction.addRequestParameters(request.url.requestParameters)

  // URL is sent as an agent attribute with transaction events
  transaction.trace.attributes.addAttribute(
    ATTR_DEST.TRANS_EVENT | ATTR_DEST.ERROR_EVENT,
    'request.uri',
    request.url.path
  )

  segment.addSpanAttribute('request.uri', request.url.path)

  headerAttributes.collectRequestHeaders(request.headers, transaction)

  if (shim.agent.config.distributed_tracing.enabled) {
    const lowercaseHeaders = lowercaseObjectKeys(request.headers)

    const transportType = request.transportType && request.transportType.toUpperCase()
    transaction.acceptDistributedTraceHeaders(transportType, lowercaseHeaders)
  }
}