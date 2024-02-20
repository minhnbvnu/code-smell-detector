function selectSubLayer(subGroup, select) {

    var layerType = require("../modules/Type");

    var appVersion = sketch.version.sketch;

    var loopChildren = subGroup.children().objectEnumerator();
    while (subLayer = loopChildren.nextObject()) {

        if (
            (layerType.isText(subLayer)) ||
            (layerType.isShape(subLayer)) ||
            (layerType.isBitmap(subLayer)) ||
            (layerType.isSlice(subLayer)) ||
            (layerType.isSymbolInstance(subLayer))
        ) {
            // Fix Sketch 45
            if (appVersion < 45) {
                subLayer.select_byExpandingSelection(select, select);
            } else {
                subLayer.select_byExtendingSelection(select, select);
            }
        }
    }

}