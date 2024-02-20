function deriveEnvVar(key, paths) {
  let configPath = paths.join('_')
  configPath = configPath ? `${configPath}_` : configPath
  return `NEW_RELIC_${configPath.toUpperCase()}${key.toUpperCase()}`
}