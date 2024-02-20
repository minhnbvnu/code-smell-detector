function _findConfigFile() {
  const configFileCandidates = getConfigFileLocations().reduce((files, configPath) => {
    const configFiles = getConfigFileNames().map((filename) =>
      path.join(path.resolve(configPath), filename)
    )

    return files.concat(configFiles)
  }, [])

  return configFileCandidates.find(exists)
}