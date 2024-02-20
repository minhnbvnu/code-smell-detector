function checkingBorders(layer) {
    if (layer.style().enabledBorders().count() == 0) {
        return true;
    }
    var loopBorders = layer.style().enabledBorders().objectEnumerator();
    var borders;
    while (borders = loopBorders.nextObject()) {
        if (borders.fillType() == 0) {
            if (borders.color().alpha() != 0) {
                return false;
            }
        } else {
            if (borders.contextSettings().opacity() == 0) {
               return true;
            } else {
                var gradientStops = borders.gradient().stops();
                var loopStops = gradientStops.objectEnumerator();
                var stop;
                while (stop = loopStops.nextObject()) {
                    if (stop.color().alpha() != 0) {
                        return false;
                    }
                }
            }
        }
    }
    return true;
}