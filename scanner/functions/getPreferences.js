function getPreferences() {
  let schemaId = 'org.gnome.desktop.wm.preferences'
  return new PreferencesManager({ schema_id: schemaId })
}