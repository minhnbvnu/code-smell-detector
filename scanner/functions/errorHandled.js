function errorHandled(req, err) {
  const txInfo = getTransactionInfo(this, req)
  if (txInfo && txInfo.error === err) {
    txInfo.errorHandled = true
  }
}