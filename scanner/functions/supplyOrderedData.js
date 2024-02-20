function supplyOrderedData(context, data) {
    var sketch = require("sketch");
    var version = sketch.version.sketch;
    for (var i = 0; i < context.data.requestedCount; i++) {
        var dataIndex;
        if (context.data.isSymbolInstanceOverride == 1) {
            var selection;
            if (version >= 84) {
                selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers();
            } else {
                selection = NSDocumentController.sharedDocumentController().currentDocument().selectedLayers().layers();
            }
            dataIndex = selection.indexOfObject(context.data.items.objectAtIndex(i).symbolInstance());
        } else {
            dataIndex = i;
        }
        DataSupplier.supplyDataAtIndex(context.data.key, data[dataIndex % data.length], i);
    }
}