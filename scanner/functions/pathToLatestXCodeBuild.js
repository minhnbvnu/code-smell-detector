function pathToLatestXCodeBuild() {
  const output = pathToAppsWithId('com.bohemiancoding.sketch3.xcode')
  const apps = output.split('\n')
  return apps.find(app => app.indexOf('/DerivedData/') !== -1)
}