async function mergeLocalWithSyncedSettings(local) {
  return settingsDB()
    .get('settings')
    .then(settings => settings, err => defaultSettings)
    .then(settings => syncSettings(settings))
    .then(settings => ({ ...settings, ...local }));
}