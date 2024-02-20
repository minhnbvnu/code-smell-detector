function instrumentRequest(agent, opts, makeRequest, hostname, segment) {
  const transaction = segment.transaction
  const outboundHeaders = Object.create(null)

  opts.headers = opts.headers || {}

  synthetics.assignHeadersToOutgoingRequest(agent.config, transaction, outboundHeaders)
  maybeAddDtCatHeaders(agent, transaction, outboundHeaders, opts?.headers)
  opts.headers = assignOutgoingHeaders(opts.headers, outboundHeaders)

  const request = applySegment(opts, makeRequest, hostname, segment)

  instrumentRequestEmit(agent, hostname, segment, request)

  return request
}