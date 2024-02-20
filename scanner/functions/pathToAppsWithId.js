function pathToAppsWithId(id) {
  return childProcess.execSync(`mdfind kMDItemCFBundleIdentifier == '${id}'`, {
    encoding: 'utf8',
  })
}