function _addIntrinsicAttrsFromTransaction(transaction) {
  const intrinsicAttributes = {
    webDuration: transaction.timer.getDurationInMillis() / 1000,
    timestamp: transaction.timer.start,
    name: transaction.getFullName(),
    duration: transaction.timer.getDurationInMillis() / 1000,
    totalTime: transaction.trace.getTotalTimeDurationInMillis() / 1000,
    type: 'Transaction',
    error: transaction.hasErrors()
  }

  maybeAddQueueAttributes(transaction, intrinsicAttributes)
  maybeAddExternalAttributes(transaction, intrinsicAttributes)
  maybeAddDatabaseAttributes(transaction, intrinsicAttributes)
  synthetics.assignTransactionAttrs(transaction, intrinsicAttributes)

  if (this.config.distributed_tracing.enabled) {
    transaction.addDistributedTraceIntrinsics(intrinsicAttributes)
    maybeAddParentAttributes(transaction, intrinsicAttributes)
  } else if (
    this.config.cross_application_tracer.enabled &&
    !transaction.invalidIncomingExternalTransaction &&
    (transaction.referringTransactionGuid || transaction.includesOutboundRequests())
  ) {
    addRequiredCATAttributes(transaction, intrinsicAttributes, this.config)
    maybeAddExtraCATAttributes(transaction, intrinsicAttributes, this.config)
  }

  return intrinsicAttributes
}