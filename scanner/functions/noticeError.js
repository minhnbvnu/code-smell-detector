function noticeError(req, err) {
  const txInfo = getTransactionInfo(this, req)
  if (txInfo && isError(this, err)) {
    assignError(txInfo, err)
  }
}