function buildBundle(packagerClient, requestOptions) {
  return packagerClient.buildBundle({...requestOptions, unbundle: true});
}