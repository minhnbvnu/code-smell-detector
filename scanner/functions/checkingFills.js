function checkingFills(layer) {
    if (layer.style().enabledFills().count() == 0) {
        return true;
    }
    var loopFills = layer.style().enabledFills().objectEnumerator();
    var fill;
    while (fill = loopFills.nextObject()) {
        if (fill.fillType() == 0) {
            if (fill.color().alpha() != 0) {
                return false;
            }
        }
        if (fill.fillType() == 1 || fill.fillType() == 4 || fill.fillType() == 5) {
            if (fill.contextSettings().opacity() == 0) {
               return true;
            }
        }
        if (fill.fillType() == 1) {
            var gradientStops = fill.gradient().stops();
            var loopStops = gradientStops.objectEnumerator();
            var stop;
            while (stop = loopStops.nextObject()) {
                if (stop.color().alpha() != 0) {
                    return false;
                }
            }
        }
    }
    return true;
}