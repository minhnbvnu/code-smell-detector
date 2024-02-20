function getCustomTransactionAttributes(transaction) {
  return transaction.trace.custom.get(DESTINATIONS.TRANS_SCOPE)
}