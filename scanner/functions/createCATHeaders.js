function createCATHeaders(config, altNames) {
  const idHeader = hashes.obfuscateNameUsingKey('9876#id', config.encoding_key)
  let txHeader = JSON.stringify(['trans id', false, 'trip id', 'path hash'])
  txHeader = hashes.obfuscateNameUsingKey(txHeader, config.encoding_key)

  const appHeader = hashes.obfuscateNameUsingKey(
    JSON.stringify([
      '6789#app',
      'app data transaction name',
      1,
      2,
      3, // queue time, response time, and content length
      'app trans id',
      false
    ]),
    config.encoding_key
  )

  return altNames
    ? {
        NewRelicID: idHeader,
        NewRelicTransaction: txHeader,
        NewRelicAppData: appHeader
      }
    : {
        'X-NewRelic-Id': idHeader,
        'X-NewRelic-Transaction': txHeader,
        'X-NewRelic-App-Data': appHeader
      }
}