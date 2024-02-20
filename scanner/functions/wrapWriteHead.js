function wrapWriteHead(agent, writeHead) {
  return function wrappedWriteHead() {
    const transaction = agent.tracer.getTransaction()
    if (!transaction) {
      logger.trace('No transaction - not adding response CAT headers')
      return writeHead.apply(this, arguments)
    }

    synthetics.assignHeadersToResponse(this, transaction)

    if (!transaction.incomingCatId) {
      logger.trace('No incoming CAT ID - not adding response CAT headers')
      return writeHead.apply(this, arguments)
    }

    if (!agent.config.trusted_account_ids) {
      logger.trace('No account IDs in config.trusted_account_ids - not adding response CAT headers')
      return writeHead.apply(this, arguments)
    }

    if (!cat.isTrustedAccountId(transaction.incomingCatId, agent.config.trusted_account_ids)) {
      return writeHead.apply(this, arguments)
    }

    // Not sure this could ever happen, but should guard against it anyway
    // otherwise exception we blow up the user's app.
    if (!agent.config.cross_process_id || !agent.config.encoding_key) {
      logger.trace(
        'Managed to have %s but not cross_process_id (%s) or encoding_key (%s) - %s',
        'agent.config.trusted_account_ids',
        agent.config.cross_process_id,
        agent.config.encoding_key,
        'not adding response CAT headers'
      )
      return writeHead.apply(this, arguments)
    }

    // -1 means no content length header was sent. We should only send this
    // value in the appData if the header is set.
    let contentLength = -1
    const newHeaders = arguments[arguments.length - 1]

    if (typeof newHeaders === 'object') {
      contentLength = headerProcessing.getContentLengthFromHeaders(newHeaders)
    }

    const currentHeaders = this.getHeaders()
    if (contentLength === -1 && currentHeaders) {
      contentLength = headerProcessing.getContentLengthFromHeaders(currentHeaders)
    }
    // Stored on the tx so we can push a metric with this time instead of
    // actual duration.
    transaction.catResponseTime = transaction.timer.getDurationInMillis()

    const { key, data } = cat.encodeAppData(agent.config, transaction, contentLength)
    if (key && data) {
      this.setHeader(key, data)
      logger.trace('Added outbound response CAT headers in transaction %s', transaction.id)
    }
    return writeHead.apply(this, arguments)
  }
}