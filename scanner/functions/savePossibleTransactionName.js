function savePossibleTransactionName(req) {
  const txInfo = getTransactionInfo(this, req)
  if (txInfo && txInfo.transaction) {
    txInfo.transaction.nameState.markPath()
  }
}