function _firstPartyInstrumentation(agent, fileName, shim, nodule, moduleName) {
  const fullPath = path.resolve(fileName)
  if (!fs.existsSync(fileName)) {
    return logger.warn('Tried to load instrumentation from %s, but file does not exist', fullPath)
  }
  try {
    return require(fileName)(agent, nodule, moduleName, shim)
  } catch (error) {
    logger.warn(
      error,
      'Failed to instrument module %s using %s',
      path.basename(fileName, '.js'),
      fullPath
    )
  }
}