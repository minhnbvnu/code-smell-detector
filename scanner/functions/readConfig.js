function readConfig () {
  try {
    const result = fs.readFileSync(localConfig.configUrl)//
    return result//
  } catch (error) {
    return false//
  }
}