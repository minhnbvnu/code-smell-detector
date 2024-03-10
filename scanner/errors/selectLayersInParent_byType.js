function selectLayersInParent_byType(parent, type, callback) {
    
    var layerType = require("../modules/Type");
    var appVersion = sketch.version.sketch;
    var count = 0;
    
    if (
        parent.containsLayers() && parent.class() != "MSShapeGroup"
    ) {

        if (type == "group") {
            var loopLayers = parent.layers().objectEnumerator();
            var layer;
            while (layer = loopLayers.nextObject()) {
                if (layer.class() == "MSLayerGroup") {
                    // Fix Sketch 45
                    if (appVersion < 45) {
                        layer.select_byExpandingSelection(true, true);
                    } else {
                        layer.select_byExtendingSelection(true, true);
                    }
                    count ++;
                }
                if (layer.class() == "MSArtboardGroup" || layer.class() == "MSSymbolMaster") {
                    var loopLayersInArtboard = layer.layers().objectEnumerator();
                    var layerInArtboard;
                    while (layerInArtboard = loopLayersInArtboard.nextObject()) {
                        if (layerInArtboard.class() == "MSLayerGroup") {
                            // Fix Sketch 45
                            if (appVersion < 45) {
                                layerInArtboard.select_byExpandingSelection(true, true);
                            } else {
                                layerInArtboard.select_byExtendingSelection(true, true);
                            }
                            count ++;
                        }
                    }
                }
            }
        } else {
            var loopChildren = parent.children().objectEnumerator();
            var layer;
            while (layer = loopChildren.nextObject()) {
                if (
                    (type == "text" && layerType.isText(layer)) ||
                    (type == "shape" && layerType.isShape(layer)) ||
                    (type == "image" && layerType.isBitmap(layer)) ||
                    (type == "slice" && layerType.isSlice(layer)) ||
                    (type == "symbol instance" && layerType.isSymbolInstance(layer))
                ) {
                    
                    // Fix Sketch 45
                    if (appVersion < 45) {
                        layer.select_byExpandingSelection(true, true);
                    } else {
                        layer.select_byExtendingSelection(true, true);
                    }
                    count ++;
                }
            }
        }

    }

    if (callback && typeof(callback) == "function") {
        callback(count);
    }

}