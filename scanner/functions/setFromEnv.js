function setFromEnv({ config, key, envVar, formatter, paths }) {
  const setting = process.env[envVar]
  if (setting) {
    const formattedSetting = formatter ? formatter(setting, logger) : setting
    setNestedKey(config, [...paths, key], formattedSetting)
  }
}