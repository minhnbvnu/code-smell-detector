function initConfig () {
  try {
    const config = readConfig()//
    if (config) {
      localConfig.config = JSON.parse(config)//
      return true//
    }
    const defalutConfig = {}//
    const content = JSON.stringify(defalutConfig)//
    fs.writeFileSync(localConfig.configUrl, content)//
    localConfig.config = defalutConfig//
    return true//
  } catch (e) {
    return false//
  }
}