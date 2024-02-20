function getAllUnusedSymbols(context) {
    var document = context.document;
    var documentData = document.documentData();
    // In Sketch 49, unused Symbols imported from Libraries are now cleared when saving a document
    if (sketch.version.sketch >= 49) {
        var allSymbols = documentData.localSymbols();
    } else {
        var allSymbols = documentData.allSymbols();
    }
    var result = allSymbols.mutableCopy();

    var loopPages = document.pages().objectEnumerator();
    var page;
    while (page = loopPages.nextObject()) {
        var symbolInstancesInPage = page.allSymbolInstancesInChildren().allObjects();
        var loopSymbolInstancesInPage = symbolInstancesInPage.objectEnumerator();
        var symbolInstance;
        while (symbolInstance = loopSymbolInstancesInPage.nextObject()) {
            result.removeObject(symbolInstance.symbolMaster());
            var overrideValues = symbolInstance.overrideValues();
            var loopOverrideValues = overrideValues.objectEnumerator();
            var overrideValue;
            while (overrideValue = loopOverrideValues.nextObject()) {
                if (overrideValue.overrideName().containsString("_symbolID")) {
                    result.removeObject(documentData.symbolWithID(overrideValue.value()));
                }
            }
        }
    }

    var sortByName = NSSortDescriptor.sortDescriptorWithKey_ascending("name", true);
    result.sortUsingDescriptors(NSArray.arrayWithObject(sortByName));

    var sortByType = NSSortDescriptor.sortDescriptorWithKey_ascending("isForeign", false);
    result.sortUsingDescriptors(NSArray.arrayWithObject(sortByType));

    return result;

}