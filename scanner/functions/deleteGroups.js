function deleteGroups(layer, callback) {

    var count = 0;

    if (layer.class() == "MSLayerGroup") {
        layer.ungroup();
        count++;
    } else {
        if (
            layer.containsLayers() &&
            (
                layer.class() != "MSShapeGroup" ||
                layer.class() != "MSRectangleShape" ||
                layer.class() != "MSOvalShape" ||
                layer.class() != "MSShapePathLayer"
            )
        ) {
            var loopChildren = layer.children().objectEnumerator();
            while (childLayer = loopChildren.nextObject()) {

                if (childLayer.class() == "MSLayerGroup") {
                    childLayer.ungroup();
                    count++;
                }
            }
        }
    }

    callback(count);
}