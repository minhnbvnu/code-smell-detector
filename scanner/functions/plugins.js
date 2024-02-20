function plugins () {
  if (!isMainThread) {
    return JSON.parse(getEnvironmentData('__NEXTEIN_PLUGIN_CFG'))
  }
  return JSON.parse(process.env.__NEXTEIN_PLUGIN_CFG || '[]')
}