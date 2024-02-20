function getMaskSymbolFromLib(context, colorSymbolMaster, colorLibrary) {
  utils.clearSelection(context)
  const librairiesController = AppController.sharedInstance().librariesController()
  // const symbolMaster = (colorLibrary) ? librairiesController.importForeignSymbol_fromLibrary_intoDocument(colorSymbolMaster, colorLibrary, context.document.documentData()).symbolMaster() : colorSymbolMaster

  let importedSymbol;
  if (MSApplicationMetadata.metadata().appVersion >= 50) {
    const shareableObjectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(colorSymbolMaster, colorLibrary);
    importedSymbol = librairiesController.importShareableObjectReference_intoDocument(shareableObjectReference, context.document.documentData());
  } else {
    importedSymbol = librairiesController.importForeignSymbol_fromLibrary_intoDocument_(colorSymbolMaster, colorLibrary, context.document.documentData());
  }
  const symbolMaster = (colorLibrary) ? importedSymbol.symbolMaster() : colorSymbolMaster;
  return symbolMaster.newSymbolInstance();
}