function checkingInnerShadows(layer) {
    if (layer.style().enabledInnerShadows().count() == 0) {
        return true;
    }
    var loopInnerShadows = layer.style().enabledInnerShadows().objectEnumerator();
    var innerShadows;
    while (innerShadows = loopInnerShadows.nextObject()) {
        if (innerShadows.color().alpha() != 0) {
            return false;
        }
    }
    return true;
}