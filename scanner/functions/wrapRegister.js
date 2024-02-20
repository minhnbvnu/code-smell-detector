function wrapRegister(shim, original) {
  const constants = shim.require('./build/src/constants')

  return function wrappedRegister() {
    const args = shim.argsToArray.apply(shim, arguments)

    const name = args[0]
    const handler = args[1]
    const type = args[args.length - 1]

    if (this.handlers.has(name)) {
      shim.logger.debug(
        `Not re-instrumenting gRPC method handler for ${name}: it is already registered in the server.`
      )
      return original.apply(this, arguments)
    }

    args[1] = shim.bindCreateTransaction(
      instrumentedHandler,
      new specs.TransactionSpec({ type: shim.WEB })
    )

    return original.apply(this, args)

    function instrumentedHandler(stream) {
      const { transaction, segment } = createTransaction()
      acceptDTHeaders(stream, transaction)
      if (semver.gte(shim.pkgVersion, '1.10.0')) {
        instrumentInterceptors(stream, transaction)
      } else {
        instrumentEventListeners(stream, transaction)
      }
      return shim.applySegment(handler, segment, true, this, arguments)
    }

    function createTransaction() {
      const parent = shim.getActiveSegment()
      const transaction = parent.transaction

      // Create the transaction segment using the request URL for now. Once a
      // better name can be determined this segment will be renamed to that.
      const segment = shim.createSegment(name, recordHttp)
      segment.start()

      transaction.type = 'web'
      transaction.baseSegment = segment
      transaction.url = name

      transaction.trace.attributes.addAttribute(DESTINATION, 'request.method', transaction.url)

      transaction.trace.attributes.addAttribute(DESTINATION, 'request.uri', transaction.url)

      shim.setTransactionUri(transaction.url)

      // This attribute isn't required by the spec, but it seems useful to have
      transaction.trace.attributes.addAttribute(DESTINATION, 'grpc.type', type)
      return { transaction, segment }
    }

    function acceptDTHeaders(stream, transaction) {
      const metadata = stream.metadata
      Object.entries(metadata.getMap()).forEach(([key, value]) => {
        transaction.trace.attributes.addAttribute(DESTINATION, `request.headers.${key}`, value)
      })

      const headers = Object.create(null)
      headers.tracestate = metadata.get('tracestate').join(',')
      headers.traceparent = metadata.get('traceparent').join(',')
      headers.newrelic = metadata.get('newrelic').join(',')
      transaction.acceptDistributedTraceHeaders('HTTP', headers)
    }

    /**
     * Wraps the onCallEnd to add the response.status to trace, log an error,
     * and end transaction.
     *
     * @param {object} stream the http2 server stream
     * @param {object} transaction active transaction
     */
    function instrumentInterceptors(stream, transaction) {
      const agent = shim.agent
      const config = agent.config
      if (!shim.isWrapped(stream.call.callEventTracker, 'onCallEnd')) {
        shim.wrap(stream.call.callEventTracker, 'onCallEnd', function onCallEnd(shim, orig) {
          return function wrappedOnCallEnd() {
            const args = shim.argsToArray.apply(shim, arguments)
            const [{ code: statusCode }] = args
            transaction.trace.attributes.addAttribute(DESTINATION, 'response.status', statusCode)
            if (shouldTrackError(statusCode, config)) {
              const status = constants.Status[statusCode]
              const error = new Error(`gRPC status code ${statusCode}: ${status}`)
              agent.errors.add(transaction, error)
            }
            transaction.end()
            return orig.apply(this, arguments)
          }
        })
      }
    }

    /**
     * Registers event listeners for callEnd and streamEnd to add the response.status to trace, log an error,
     * and end transaction.
     *
     * Note: two listeners are registered as callEnd is emitted before streamEnd. Unlike the instrumentInterceptors
     * case above where onCallEnd is called last.
     *
     * @param {object} stream the http2 server stream
     * @param {object} transaction active transaction
     */
    function instrumentEventListeners(stream, transaction) {
      const agent = shim.agent
      const config = agent.config

      stream.call.once('callEnd', (statusCode) => {
        transaction.trace.attributes.addAttribute(DESTINATION, 'response.status', statusCode)
        if (shouldTrackError(statusCode, config)) {
          const status = constants.Status[statusCode]
          const error = new Error(`gRPC status code ${statusCode}: ${status}`)
          agent.errors.add(transaction, error)
        }
      })
      stream.call.once('streamEnd', () => {
        transaction.end()
      })
      // TODO should also instrument the 'data' event on the stream
      // object, as that can ensue in lots of processing when the
      // client is streaming. https://issues.newrelic.com/browse/NEWRELIC-1460
    }
  }
}