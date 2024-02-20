function removeHiddenLayers(parent, callback) {

    var count = 0;

    if (parent.containsLayers()) {
        var loop = parent.children().objectEnumerator();
        var layer;
        while (layer = loop.nextObject()) {
            if (!layer.isVisible()) {
                layer.removeFromParent();
                count ++;
            }
        }
    }

    callback(count);
}