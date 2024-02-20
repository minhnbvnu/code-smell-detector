function registerColor(context, rootObject, params) {
  if (params.color) {
    const libraryId = (params.colorLib) ? params.colorLib.libraryID() : null
    const colorId = (params.colorSource === 'sharedStyle') ? params.color.objectID() : params.color.symbolID()
    context.command.setValue_forKey_onLayer(libraryId, "colorLib", rootObject)
    context.command.setValue_forKey_onLayer(colorId, "color", rootObject)
    context.command.setValue_forKey_onLayer(params.colorSource, "source", rootObject)
    context.command.setValue_forKey_onLayer(null, "colorPicker", rootObject)
  } else if (params.colorPicker) {
    context.command.setValue_forKey_onLayer(utils.convertMSColorToString(params.colorPicker), "colorPicker", rootObject)
    context.command.setValue_forKey_onLayer(null, "colorLib", rootObject)
    context.command.setValue_forKey_onLayer(null, "source", rootObject)
    context.command.setValue_forKey_onLayer(null, "color", rootObject)
  }
}