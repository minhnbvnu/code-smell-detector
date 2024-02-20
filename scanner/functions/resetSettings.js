function resetSettings(context) {
  LIST_SETTINGS_FIELDS.forEach((field) => {
    context.command.setValue_forKey_onDocument(null, field.name, context.document.documentData());
  })
}