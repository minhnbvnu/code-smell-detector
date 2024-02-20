function assignSyntheticsHeader(header, encKey, trustedIds, transaction) {
  const synthData = parseSyntheticsHeader(header, encKey, trustedIds)
  if (!synthData) {
    return
  }

  transaction.syntheticsData = synthData
  transaction.syntheticsHeader = header
}