function refreshSyncOnly() {
  // gather persisted settings
  const framework = getSetting('Framework')
  const dispatcher = getSetting('Dispatcher')
  const dispatcherVersion = getSetting(DISPATCHER_VERSION)

  // clearing and rebuilding a global variable
  settings = Object.create(null)
  // add persisted settings
  if (framework.length) {
    framework.forEach(function addFrameworks(fw) {
      addSetting('Framework', fw)
    })
  }

  if (dispatcher.length) {
    dispatcher.forEach(function addDispatchers(d) {
      addSetting('Dispatcher', d)
    })
  }

  if (dispatcherVersion.length) {
    dispatcher.forEach(function addDispatchers(d) {
      addSetting(DISPATCHER_VERSION, d)
    })
  }

  gatherEnv()
  remapConfigSettings()
}