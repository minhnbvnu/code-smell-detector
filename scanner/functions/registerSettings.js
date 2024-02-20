function registerSettings(context, params) {


  LIST_SETTINGS_FIELDS.forEach((field) => {
    NSUserDefaults.standardUserDefaults().setObject_forKey(params[field.name], field.name)
    context.command.setValue_forKey_onDocument(params[field.name], field.name, context.document.documentData());
  })
}