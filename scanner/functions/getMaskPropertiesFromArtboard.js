function getMaskPropertiesFromArtboard(context, rootObject) {


  let params = getColorParams(context, rootObject);

  const maskLayer = rootObject.firstLayer()
  if (!params.colorLibraryId && !params.colorSymbolId && !params.colorString && maskLayer && maskLayer.hasClippingMask()) {
    switchVersion.switchToV4(context, rootObject)
    params = getColorParams(context, rootObject)
  }

  if (!params.colorLibraryId && params.colorSymbolId) {
    params.colorSymbol = librariesProvider.getSymbolFromDocument(context.document.documentData(), params.colorSymbolId)
  } else if (params.colorLibraryId) {
    params.colorLibrary = librariesProvider.getLibById(params.colorLibraryId)
    librariesProvider.loadLibrary(params.colorLibrary)
    params.colorSymbol = librariesProvider.getSymbolFromDocument(params.colorLibrary.document(), params.colorSymbolId)
  }

  params.colorPicker = (params.colorString) ? utils.convertStringToMSColor(params.colorString) : null

  const result = {
    colorLib: (params.colorLibraryId) ? params.colorLibrary : null,
    color: (params.colorSymbolId) ? params.colorSymbol : null,
    colorPicker: params.colorPicker
  }

  return (!result.colorLib && !result.color && !result.colorPicker) ? {} : result
}