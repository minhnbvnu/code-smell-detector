function layerIsTransparency(layer) {

    var type = require("../modules/Type");

    if (layer.isKindOfClass(MSStyledLayer)) {
        if (layer.style().contextSettings().opacity() == 0) {
            return true;
        }
    }

    if (type.isShape(layer)) {
        if (
            checkingFills(layer) &&
            checkingBorders(layer) &&
            checkingShadows(layer) &&
            checkingInnerShadows(layer)
        ) {
            return true;
        }
    }

    if (type.isText(layer)) {
        if (layer.style().enabledFills().count() == 0) {
            if (
                layer.textColor().alpha() == 0 &&
                checkingBorders(layer) &&
                checkingShadows(layer) &&
                checkingInnerShadows(layer)
            ) {
                return true;
            }
        } else {
            if (
                checkingFills(layer) &&
                checkingBorders(layer) &&
                checkingShadows(layer) &&
                checkingInnerShadows(layer)
            ) {
                return true;
            }
        }

    }

    return false;

}