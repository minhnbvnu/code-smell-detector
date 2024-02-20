function deselectAllChildAndSelf(layer, self) {
    var loop = layer.children().objectEnumerator();
    var child;
    while (child = loop.nextObject()) {
        if (self == false && child == layer) {
            continue;
        }
        if (sketch.version.sketch < 45) {
            child.select_byExpendingSelection(false, true);
        } else {
            child.select_byExtendingSelection(false, true);
        }
    }
}