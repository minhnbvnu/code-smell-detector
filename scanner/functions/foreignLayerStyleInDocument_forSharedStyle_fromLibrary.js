function foreignLayerStyleInDocument_forSharedStyle_fromLibrary(documentData, sharedStyle, library) {
    for (var i = 0; i < documentData.foreignLayerStyles().count(); i++) {
        var foreignLayerStyle = documentData.foreignLayerStyles().objectAtIndex(i);
        if (String(sharedStyle.objectID()) == String(foreignLayerStyle.remoteShareID())) {
            return foreignLayerStyle;
        }
    }
    var foreignLayerStyle = MSForeignLayerStyle.alloc().initWithOriginalObject_inLibrary(sharedStyle, library);
    documentData.addForeignLayerStyle(foreignLayerStyle);
    return foreignLayerStyle;
}