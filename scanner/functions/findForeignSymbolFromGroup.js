function findForeignSymbolFromGroup(context, group) {
    var document = context.document;
    var documentData = document.documentData();
    var predicate = NSPredicate.predicateWithFormat("libraryID == %@ && sourceLibraryName == %@", documentData.objectID(), group.objectID());
    var foreignSymbols = documentData.foreignSymbols().filteredArrayUsingPredicate(predicate);
    if (foreignSymbols.count() > 0) {
        return foreignSymbols.firstObject();
    } else {
        return nil;
    }
}