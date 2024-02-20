function _createDistributedTracePayload() {
  const config = this.agent.config
  const accountId = config.account_id
  const appId = config.primary_application_id
  const distTraceEnabled = config.distributed_tracing.enabled

  if (!accountId || !appId || !distTraceEnabled) {
    logger.debug(
      'Invalid configuration for distributed trace payload ' +
        '(distributed_tracing.enabled: %s, account_id: %s, application_id: %s) ' +
        'in transaction %s',
      distTraceEnabled,
      accountId,
      appId,
      this.id
    )

    return new DTPayloadStub()
  }

  const currSegment = this.agent.tracer.getSegment()
  const data = {
    ty: 'App',
    ac: accountId,
    ap: appId,
    tx: this.id,
    tr: this.traceId,
    pr: this.priority,
    sa: this.sampled,
    ti: Date.now()
  }

  if (config.span_events.enabled && this.sampled && currSegment) {
    data.id = currSegment.id
  }

  if (config.trusted_account_key && config.trusted_account_key !== accountId) {
    data.tk = config.trusted_account_key
  }

  this.isDistributedTrace = true
  this.agent.recordSupportability('DistributedTrace/CreatePayload/Success')

  return new DTPayload(data)
}