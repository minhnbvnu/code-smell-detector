function getAllPagesHaveArtboards(document) {
    var pages = NSMutableArray.alloc().init();
    document.pages().forEach(function(page) {
        if (page.artboards().count() > 0) {
            pages.addObject(page);
        }
    });
    return pages;
}