function setSettings(context) {
  const params = settingsModal.call({}, context)
  if (params.button === 1001) return
  settingsProvider.registerSettings(context, params)
  analytics.action(context, 'settings', 'settings', 'settings')
}