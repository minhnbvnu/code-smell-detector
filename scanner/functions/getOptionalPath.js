function getOptionalPath (key, orElse) {
  return deployerConfig[key] != null
    ? path.resolve(path.dirname(deployerConfigName), deployerConfig[key])
    : p(orElse)
}