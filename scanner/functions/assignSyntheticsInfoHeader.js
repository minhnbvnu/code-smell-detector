function assignSyntheticsInfoHeader(header, encKey, transaction) {
  const synthInfoData = parseSyntheticsInfoHeader(header, encKey)
  if (!synthInfoData) {
    return
  }

  transaction.syntheticsInfoData = synthInfoData
  transaction.syntheticsInfoHeader = header
}