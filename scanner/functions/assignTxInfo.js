function assignTxInfo({ shim, req, route, fnName, isErrorWare }) {
  // Fetch the transaction information from that request.
  const txInfo = getTransactionInfo(shim, req)
  if (!txInfo || !txInfo.transaction) {
    shim.logger.debug(
      { txInfo: txInfo },
      'Could not get transaction info in %s (%s)',
      route,
      fnName
    )
    return null
  }
  txInfo.transaction.nameState.setPrefix(shim._metrics.FRAMEWORK)
  txInfo.errorHandled |= isErrorWare
  return txInfo
}