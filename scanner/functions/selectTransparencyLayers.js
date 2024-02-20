function selectTransparencyLayers(layer) {
    if (layer.isKindOfClass(MSStyledLayer)) {
        if (layerIsTransparency(layer)) {
            // Fix Sketch 45
            if (sketch.version.sketch < 45) {
                layer.select_byExpandingSelection(true, true);
            } else {
                layer.select_byExtendingSelection(true, true);
            }
        } else {
            var loopChildren = layer.children().objectEnumerator();
            var childLayer;
            while (childLayer = loopChildren.nextObject()) {
                if (childLayer.isKindOfClass(MSStyledLayer)) {
                    if (layerIsTransparency(childLayer)) {
                        // Fix Sketch 45
                        if (sketch.version.sketch < 45) {
                            childLayer.select_byExpandingSelection(true, true);
                        } else {
                            childLayer.select_byExtendingSelection(true, true);
                        }
                    }
                }
            }
        }
    }

}