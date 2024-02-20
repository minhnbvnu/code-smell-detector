function saveLocal(settings) {
  return settingsDB()
    .get('_local/settings')
    .then(doc => doc, err => defaultLocalSettings)
    .then(doc => settingsDB().put({ ...doc, ...settings }));
}