function wrapEmitWithTransaction(agent, emit, isHTTPS) {
  const tracer = agent.tracer
  const transport = isHTTPS ? 'HTTPS' : 'HTTP'
  return tracer.transactionProxy(function wrappedHandler(evnt, request, response) {
    const transaction = tracer.getTransaction()
    if (!transaction) {
      return emit.apply(this, arguments)
    }

    transaction.nameState.setPrefix(NAMES.NODEJS.PREFIX)
    transaction.nameState.setDelimiter(NAMES.ACTION_DELIMITER)

    // Store the transaction information on the request and response.
    const txInfo = storeTxInfo(transaction, request, response)

    if (request) {
      initializeRequest(transaction, request)
    }

    // Create the transaction segment using the request URL for now. Once a
    // better name can be determined this segment will be renamed to that.
    const segment = tracer.createSegment(request.url, recordWeb)
    segment.start()

    if (request.method != null) {
      segment.addSpanAttribute('request.method', request.method)
    }

    if (txInfo) {
      // Seed segment stack to enable parenting logic leveraged by
      // web framework instrumentations.
      txInfo.segmentStack.push(segment)
    }

    transaction.type = 'web'
    transaction.baseSegment = segment

    /* Needed for Connect and Express middleware that monkeypatch request
     * and response via listeners.
     */
    tracer.bindEmitter(request, segment)
    tracer.bindEmitter(response, segment)

    // the error tracer needs a URL for tracing, even though naming overwrites
    transaction.parsedUrl = url.parse(request.url, true)
    transaction.url = urltils.obfuscatePath(agent.config, transaction.parsedUrl.pathname)
    transaction.verb = request.method

    // URL is sent as an agent attribute with transaction events
    transaction.trace.attributes.addAttribute(
      DESTS.TRANS_EVENT | DESTS.ERROR_EVENT,
      'request.uri',
      transaction.url
    )

    segment.addSpanAttribute('request.uri', transaction.url)

    transaction.port = parsePort(this)
    // need to set any config-driven names early for RUM
    logger.trace(
      { url: request.url, transaction: transaction.id },
      'Applying user naming rules for RUM.'
    )
    transaction.applyUserNamingRules(request.url)

    const queueTimeStamp = headerProcessing.getQueueTime(logger, request.headers)
    if (queueTimeStamp) {
      transaction.queueTime = Date.now() - queueTimeStamp
    }

    synthetics.assignHeadersToTransaction(agent.config, transaction, request.headers)

    maybeAddDtCatHeaders({ transaction, request, transport, agent })

    response.once('finish', instrumentedFinish.bind(response, segment, transaction))
    response.once('close', instrumentedFinish.bind(response, segment, transaction))

    return tracer.bindFunction(emit, segment).apply(this, arguments)
  })
}