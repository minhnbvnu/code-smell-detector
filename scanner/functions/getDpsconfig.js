function getDpsconfig() {
  const dpsConfFile = path.resolve(currDir, defConf.filename)
  if(!fs.existsSync(dpsConfFile)) {
    return utils.log.error(`please run 'dps init' to initialize a config file`, 1)
  }
  return require(dpsConfFile);
}