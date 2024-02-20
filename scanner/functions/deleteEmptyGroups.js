function deleteEmptyGroups(layer, callback) {

    var count = 0;

    if (layer.class() == "MSLayerGroup" && !layer.containsLayers()) {
        layer.removeFromParent();
        count ++;
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
                if (childLayer.class() == "MSLayerGroup" && !childLayer.containsLayers()) {
                    childLayer.removeFromParent();
                    count ++;
                }
            }
        }
    }

    callback(count);
}