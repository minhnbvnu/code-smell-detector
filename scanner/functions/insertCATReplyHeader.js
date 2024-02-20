function insertCATReplyHeader(headers, useAlternateHeaderNames) {
  // Is CAT enabled?
  const config = this.agent.config
  if (!config.cross_application_tracer.enabled) {
    this.logger.trace('CAT disabled, not adding CAT reply header.')
    return
  } else if (config.distributed_tracing.enabled) {
    this.logger.warn('Distributed tracing is enabled, not adding CAT reply header.')
    return
  } else if (!config.encoding_key) {
    this.logger.warn('Missing encoding key, not adding CAT reply header!')
    return
  } else if (!headers) {
    this.logger.debug('Missing headers object, not adding CAT reply header!')
    return
  }

  // Are we in a transaction?
  const segment = this.getSegment()
  if (!segment || !segment.transaction.isActive()) {
    this.logger.trace('Not adding CAT reply header, not in an active transaction.')
    return
  }
  const tx = segment.transaction

  // Hunt down the content length.
  // NOTE: In AMQP, content-type and content-encoding are guaranteed fields, but
  // there is no content-length field or header. For that, content length will
  // always be -1.
  let contentLength = -1
  for (const key in headers) {
    if (key.toLowerCase() === 'content-length') {
      contentLength = headers[key]
      break
    }
  }

  const { key, data } = cat.encodeAppData(config, tx, contentLength, useAlternateHeaderNames)
  // Add the header.
  if (key && data) {
    headers[key] = data
    this.logger.trace('Added outbound response CAT headers for transaction %s', tx.id)
  }
}