function changeAllInstancesToGroup(context, symbolMaster) {
    var sketch = require('sketch');
    var version = sketch.version.sketch;
    var loopPages = context.document.pages().objectEnumerator();
    var page;
    while (page = loopPages.nextObject()) {
        var instances = page.allSymbolInstancesInChildren().allObjects();
        var loopInstances = instances.objectEnumerator();
        var instance;
        while (instance = loopInstances.nextObject()) {
            if (instance.symbolMaster()) {
                if (instance.symbolMaster() == symbolMaster) {
                    if (version >= 76) {
                        instance.detachStylesAndReplaceWithGroup();
                    } else if (version >= 53) {
                        instance.detachStylesAndReplaceWithGroupRecursively(false);
                    } else {
                        instance.detachByReplacingWithGroup();
                    }
                }
            }
        }
    }
}