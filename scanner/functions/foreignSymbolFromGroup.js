function foreignSymbolFromGroup(context, group) {
    var document = context.document;
    var documentData = document.documentData();
    var rect = group.frame().rect();
    var symbolMaster = MSSymbolMaster.alloc().initWithFrame(rect);
    symbolMaster.setName("_linked" + "/" + group.name());
    group.layers().forEach(function(layer) {
        layer.copy().moveToLayer_beforeLayer(symbolMaster, nil);
        symbolMaster.layers().lastObject().frame().setX(layer.frame().x());
        symbolMaster.layers().lastObject().frame().setY(layer.frame().y());
    });
    var foreignSymbol = MSForeignSymbol.alloc().init();
    foreignSymbol.setLocalObject(symbolMaster);
    foreignSymbol.setOriginalObject(symbolMaster);
    foreignSymbol.setLibraryID(documentData.objectID());
    foreignSymbol.setSourceLibraryName(group.objectID());
    documentData.addForeignSymbol(foreignSymbol);
    return foreignSymbol;
}