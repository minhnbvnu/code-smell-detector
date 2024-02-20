function selectLayersInSelectionByType(context, type) {
    var ga = require("../modules/Google_Analytics");
    ga("Layer");

    var doc = context.document;
    var page = doc.currentPage();
    var selection = context.selection;

    var totalCount = 0;

    // Fix Sketch 45
    if (page.deselectAllLayers) {
        page.deselectAllLayers();
    } else {
        page.changeSelectionBySelectingLayers(nil);
    }

    if (selection.count() == 0) {
        selectLayersInParent_byType(page, type, function(count) {
            totalCount = count;
        });
    } else {
        var loop = selection.objectEnumerator();
        while (layer = loop.nextObject()) {
            selectLayersInParent_byType(layer, type, function(count) {
                totalCount += count;
            });
        }
    }

    if (totalCount == 0) {
        doc.showMessage(`No ${type} layers found.`);
    } else if (totalCount == 1) {
        doc.showMessage(`Select 1 ${type} layer.`);
    } else {
        doc.showMessage(`Select ${totalCount} ${type} layers.`);
    }
    
}