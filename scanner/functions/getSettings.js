function getSettings(schema) {
  schema = schema || 'org.gnome.shell.extensions.unite'

  let gioSSS       = Gio.SettingsSchemaSource
  let schemaDir    = getDir().get_child('schemas')
  let schemaSource = gioSSS.get_default()

  if (schemaDir.query_exists(null)) {
    schemaDir    = schemaDir.get_path()
    schemaSource = gioSSS.new_from_directory(schemaDir, schemaSource, false)
  }

  let schemaObj = schemaSource.lookup(schema, true)

  if (!schemaObj) {
    let metaId  = 'unite@hardpixel.eu'
    let message = `Schema ${schema} could not be found for extension ${metaId}.`

    throw new Error(`${message} Please check your installation.`)
  }

  return new SettingsManager({ settings_schema: schemaObj })
}