function selectLayers(context, layers) {
    var doc = context.document;
    var page = doc.currentPage();
    if (page.deselectAllLayers) {
        page.deselectAllLayers();
    } else {
        page.changeSelectionBySelectingLayers(nil);
    }
    var loopLayers = layers.objectEnumerator();
    var layer;
    while (layer = loopLayers.nextObject()) {
        selectLayer(layer, true);
        zoom.toSelection();
    }
}