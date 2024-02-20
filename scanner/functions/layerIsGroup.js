function layerIsGroup(layer) {
    if (
        layer.class() == "MSPage" ||
        layer.class() == "MSSymbolMaster" ||
        layer.class() == "MSArtboardGroup" ||
        layer.class() == "MSLayerGroup"
    ) {
        return true;
    } else {
        return false;
    }
}