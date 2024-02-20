function getImportPlugin (inputFile, dependencyManager) {
  const key = getKey(inputFile)
  let result = importPlugins[key]
  if (!result) {
    result = importPlugins[key] = new MeteorImportLessPlugin(dependencyManager)
  }
  return result
}