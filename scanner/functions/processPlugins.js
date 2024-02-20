function processPlugins (nexteinPlugins = []) {
  const config = nexteinPlugins
    .map(normalizeString)
    .map(normalizeArray)
    .map(normalizeObject)
    .map(checkForOldMarkdownPlugin)
    .map(resolveSimplifiedNames)
    .map(createPlugin)
    .reduce(processDuplicates, [])

  const serialized = JSON.stringify(config)

  process.env.__NEXTEIN_PLUGIN_CFG = serialized
  setEnvironmentData('__NEXTEIN_PLUGIN_CFG', serialized)

  return config
}