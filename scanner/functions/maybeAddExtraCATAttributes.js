function maybeAddExtraCATAttributes(transaction, attributes, configuration) {
  if (transaction.referringPathHash) {
    attributes['nr.referringPathHash'] = transaction.referringPathHash
  }

  if (transaction.referringTransactionGuid) {
    const refId = transaction.referringTransactionGuid
    attributes['nr.referringTransactionGuid'] = refId
  }

  const alternatePathHashes = transaction.alternatePathHashes()
  if (alternatePathHashes) {
    attributes['nr.alternatePathHashes'] = alternatePathHashes
  }

  if (transaction.baseSegment && transaction.type === 'web') {
    const apdex =
      configuration.web_transactions_apdex[transaction.getFullName()] || configuration.apdex_t
    const duration = transaction.baseSegment.getDurationInMillis() / 1000
    attributes['nr.apdexPerfZone'] = calculateApdexZone(duration, apdex)
  }
}