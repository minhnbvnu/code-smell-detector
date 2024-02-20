function removeRedundantGroups(layer) {
    if (layer.class() == "MSLayerGroup") {
        // Ungroup Redundant Groups
        if (layer.layers().count() == 1) {
            var child = layer.layers().firstObject();
            if(groupIsSafeToUngroup(layer)) {
                layer.ungroup();
            }
            if (child.class() == "MSLayerGroup") {removeRedundantGroups(child);}
        } else {
            for (var i = 0; i < layer.layers().count(); i++) {
                var childLayer = layer.layers().objectAtIndex(i);
                removeRedundantGroups(childLayer);
            }
        }
        // Remove Empty Groups
        if (layer.layers().count() == 0) {
            layer.removeFromParent();
        }
    } else {
        if (layer.containedLayers() && layer.class() != "MSShapeGroup") {
            for (var i = 0; i < layer.layers().count(); i++) {
                var childLayer = layer.layers().objectAtIndex(i);
                removeRedundantGroups(childLayer);
            }
        }
    }
}