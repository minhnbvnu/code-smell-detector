function _getErrorEventIntrinsicAttrs(transaction, errorClass, message, expected, timestamp, conf) {
  // the server expects seconds instead of milliseconds
  if (timestamp) {
    timestamp = timestamp / 1000
  }

  const attributes = {
    'type': 'TransactionError',
    'error.class': errorClass,
    'error.message': conf.high_security ? '' : message,
    'timestamp': timestamp,
    'error.expected': expected
  }

  if (transaction) {
    attributes.transactionName = transaction.getFullName()
    attributes.duration = transaction.timer.getDurationInMillis() / 1000

    maybeAddQueueAttributes(transaction, attributes)
    maybeAddExternalAttributes(transaction, attributes)
    maybeAddDatabaseAttributes(transaction, attributes)
    synthetics.assignTransactionAttrs(transaction, attributes)

    if (transaction.agent.config.distributed_tracing.enabled) {
      transaction.addDistributedTraceIntrinsics(attributes)
    } else {
      attributes['nr.referringTransactionGuid'] = transaction.referringTransactionGuid
    }

    attributes['nr.transactionGuid'] = transaction.id

    if (transaction.port) {
      attributes.port = transaction.port
    }
  } else {
    attributes.transactionName = 'Unknown'
  }

  return attributes
}