function recordWeb(segment, scope) {
  // in web metrics, scope is required
  if (!scope) {
    return
  }

  const tx = segment.transaction
  // if there was a nested webTransaction use its recorder instead
  if (tx.type === 'web' && tx.baseSegment && segment !== tx.baseSegment) {
    return
  }

  const duration = segment.getDurationInMillis()
  const totalTime = tx.trace.getTotalTimeDurationInMillis()
  const exclusive = segment.getExclusiveDurationInMillis()
  const partial = segment.partialName
  const config = segment.transaction.agent.config
  // named / key transaction support requires per-name apdexT
  const keyApdexInMillis = config.web_transactions_apdex[scope] * TO_MILLIS || 0

  tx.measure(NAMES.WEB.RESPONSE_TIME, null, duration, exclusive)
  tx.measure(NAMES.WEB.TOTAL_TIME, null, totalTime, exclusive)
  tx.measure(NAMES.HTTP, null, duration, exclusive)
  tx.measure(scope, null, duration, exclusive)
  tx.measure(NAMES.WEB.TOTAL_TIME + '/' + partial, null, totalTime, exclusive)

  if (tx.queueTime > 0) {
    tx.measure(NAMES.QUEUETIME, null, tx.queueTime)
  }

  if (config.distributed_tracing.enabled) {
    recordDistributedTrace(tx, 'Web', duration, exclusive)
  } else if (tx.incomingCatId) {
    tx.measure(NAMES.CLIENT_APPLICATION + '/' + tx.incomingCatId + '/all', null, tx.catResponseTime)
  }

  tx._setApdex(NAMES.APDEX + '/' + partial, duration, keyApdexInMillis)
  tx._setApdex(NAMES.APDEX, duration, keyApdexInMillis)
}