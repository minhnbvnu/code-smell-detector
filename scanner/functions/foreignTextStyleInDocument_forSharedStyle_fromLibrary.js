function foreignTextStyleInDocument_forSharedStyle_fromLibrary(documentData, sharedStyle, library) {
    for (var i = 0; i < documentData.foreignTextStyles().count(); i++) {
        var foreignTextStyle = documentData.foreignTextStyles().objectAtIndex(i);
        if (String(sharedStyle.objectID()) == String(foreignTextStyle.remoteShareID())) {
            return foreignTextStyle;
        }
    }
    var foreignTextStyle = MSForeignTextStyle.alloc().initWithOriginalObject_inLibrary(sharedStyle, library);
    documentData.addForeignTextStyle(foreignTextStyle);
    return foreignTextStyle;
}