function removeTransparencyLayers(layer, callback) {

    var count = 0;

    if (layer.containsLayers() && layerIsGroup(layer)) {
        var loop = layer.children().objectEnumerator();
        var childLayer;
        while (childLayer = loop.nextObject()) {
            if (childLayer.isKindOfClass(MSStyledLayer)) {
                if (layerIsTransparency(childLayer)) {
                    childLayer.removeFromParent();
                    count ++;
                }
            }
        }
    }

    callback(count);
}