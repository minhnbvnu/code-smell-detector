function checkingShadows(layer) {
    if (layer.style().enabledShadows().count() == 0) {
        return true;
    }
    var loopShadows = layer.style().enabledShadows().objectEnumerator();
    var shadow;
    while (shadow = loopShadows.nextObject()) {
        if (shadow.color().alpha() != 0) {
            return false;
        }
    }
    return true;
}