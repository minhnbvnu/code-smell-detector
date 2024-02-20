function iterateDocument(doc, func) {
    var pages = doc.pages();
    var loopPages = pages.objectEnumerator();
    var page;
    while (page = loopPages.nextObject()) {
        var children = page.children();
        var loopChildren = children.objectEnumerator();
        var layer;
        while (layer = loopChildren.nextObject()) {
            func(layer);
        }
    }
}