function selectHiddenLayer(layer) {
    if (!layer.isVisible()) {
        // Fix Sketch 45
        if (sketch.version.sketch < 45) {
            layer.select_byExpandingSelection(true, true);
        } else {
            layer.select_byExtendingSelection(true, true);
        }
    } else {
        var loopChildren = layer.children().objectEnumerator();
        while (childLayer = loopChildren.nextObject()) {
            if (!childLayer.isVisible()) {
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