function loadKubeconfig (cfgPath) {
  let cfgPaths

  if (!cfgPath) {
    cfgPaths = defaultConfigPaths()
  } else if (Array.isArray(cfgPath)) {
    cfgPaths = cfgPath
  } else {
    cfgPaths = [cfgPath]
  }

  const configs = cfgPaths.map(cfgPath => {
    const config = yaml.safeLoad(fs.readFileSync(cfgPath))
    return mapCertificates(cfgPath, config)
  })

  return merge.all(configs)
}