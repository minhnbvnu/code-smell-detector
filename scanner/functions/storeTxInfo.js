function storeTxInfo(transaction, request, response) {
  if (!request || !response) {
    logger.debug('Missing request or response object! Not storing transaction info.')
    return
  }

  const txInfo = {
    transaction: transaction,
    segmentStack: [],
    errorHandled: false,
    error: null
  }
  request[symbols.transactionInfo] = response[symbols.transactionInfo] = txInfo

  logger.trace('Stored transaction %s information on request and response', transaction.id)

  return txInfo
}