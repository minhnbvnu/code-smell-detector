function handleMqTracingHeaders(headers, segment, transportType) {
  // TODO: replace functionality when CAT fully removed.

  if (!headers) {
    this.logger.debug('No headers for CAT or DT processing.')
    return
  }

  const config = this.agent.config

  if (!config.cross_application_tracer.enabled && !config.distributed_tracing.enabled) {
    this.logger.trace('CAT and DT disabled, not extracting headers.')
    return
  }

  // Check that we're in an active transaction.
  const currentSegment = segment || this.getSegment()
  if (!currentSegment || !currentSegment.transaction.isActive()) {
    this.logger.trace('Not processing headers for CAT or DT, not in an active transaction.')
    return
  }

  const transaction = currentSegment.transaction

  if (config.distributed_tracing.enabled) {
    transaction.acceptDistributedTraceHeaders(transportType, headers)
    return
  }

  // Not DT so processing CAT.
  // TODO: Below will be removed when CAT removed.
  const { appData, id, transactionId } = cat.extractCatHeaders(headers)
  const { externalId, externalTransaction } = cat.parseCatData(
    id,
    transactionId,
    config.encoding_key
  )
  cat.assignCatToTransaction(externalId, externalTransaction, transaction)
  const decodedAppData = cat.parseAppData(config, appData)
  cat.assignCatToSegment(decodedAppData, currentSegment)
  // TODO: Handle adding ExternalTransaction metrics for this segment.
}