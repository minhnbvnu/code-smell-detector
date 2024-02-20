function pathToLatestApp() {
  const output = pathToAppsWithId('com.bohemiancoding.sketch3')
  let latest = {
    version: -1,
  }
  const apps = output.split('\n')
  apps.forEach(app => {
    if (!app) {
      // empty line so bail out
      return
    }
    const version = appInfoForKey(app, 'CFBundleVersion')
    if (version > latest.version) {
      latest = {
        version,
        app,
      }
    }
  })
  if (latest.app) {
    return latest.app
  }
  return undefined
}