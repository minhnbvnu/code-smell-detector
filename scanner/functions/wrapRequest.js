function wrapRequest(agent, request) {
  return function wrappedRequest(input, options, cb) {
    ;[options, cb] = parseRequest(input, options, cb)
    const reqArgs = [options, cb]

    // Don't pollute metrics and calls with NR connections
    const internalOnly = options && options[symbols.offTheRecord]
    if (internalOnly) {
      delete options[symbols.offTheRecord]
    }

    // If this is not a request we're recording, exit early.
    const transaction = agent.tracer.getTransaction()
    if (!transaction || internalOnly) {
      if (!internalOnly && logger.traceEnabled()) {
        const logOpts = typeof options === 'string' ? url.parse(options) : options
        logger.trace(
          'No transaction, not recording external to %s:%s',
          logOpts.hostname || logOpts.host,
          logOpts.port
        )
      }
      return request.apply(this, reqArgs)
    }

    const args = agent.tracer.slice(reqArgs)
    const context = this

    return instrumentOutbound(agent, options, function makeRequest(opts) {
      args[0] = opts
      return request.apply(context, args)
    })
  }
}