function checkForUpdate() {
  // eslint-disable-next-line import/no-extraneous-dependencies
  return import('latest-version')
    .then((latestVersionModule) => {
      const latestVersion = latestVersionModule.default
      const currentVersion = require('./package.json').version

      return latestVersion('solhint')
        .then((latest) => {
          if (currentVersion < latest) {
            console.log('A new version of Solhint is available:', latest)
            console.log('Please consider updating your Solhint package.')
          }
        })
        .catch((error) => {
          console.error('Error checking for updates:', error.message)
        })
    })
    .catch((error) => {
      console.error('Error importing latest-version:', error.message)
    })
}