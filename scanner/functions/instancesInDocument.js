function instancesInDocument(document) {
    var allInstances = NSMutableArray.alloc().init();
    var loopPages = document.pages().objectEnumerator();
    var page;
    while (page = loopPages.nextObject()) {
        var predicate = NSPredicate.predicateWithFormat("className == %@", "MSSymbolInstance");
        var instancesInPage = page.children().filteredArrayUsingPredicate(predicate);
        allInstances.addObjectsFromArray(instancesInPage);
    }
    return allInstances;
}