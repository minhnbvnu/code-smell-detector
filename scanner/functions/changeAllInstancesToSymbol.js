function changeAllInstancesToSymbol(context, oldSymbolMaster, newSymbolMaster) {
    var loopPages = context.document.pages().objectEnumerator();
    var page;
    while (page = loopPages.nextObject()) {
        var instances = page.allSymbolInstancesInChildren().allObjects();
        var loopInstances = instances.objectEnumerator();
        var instance;
        while (instance = loopInstances.nextObject()) {
            if (instance.symbolMaster()) {
                if (instance.symbolMaster() == oldSymbolMaster) {
                    instance.changeInstanceToSymbol(newSymbolMaster);
                }
            }
        }
    }
}