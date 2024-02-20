async function getHomePackages() {
  let homeDir = null
  if (process.platform === 'win32') {
    if (process.env.USERDIR) {
      homeDir = process.env.USERDIR
    }
  } else if (process.env.HOME) {
    homeDir = process.env.HOME
  }

  _log('Getting home packages from %s', homeDir)
  if (!homeDir) {
    return
  }

  const homePath = path.resolve(homeDir, '.node_modules')
  const homeOldPath = path.resolve(homeDir, '.node_libraries')
  const home = await getPackages(homePath)
  const homeOld = await getPackages(homeOldPath)
  return { home, homeOld }
}