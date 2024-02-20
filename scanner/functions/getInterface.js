function getInterface() {
  let schemaId = 'org.gnome.desktop.interface'
  return new SettingsObject({ schema_id: schemaId })
}