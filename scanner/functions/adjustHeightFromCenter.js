function adjustHeightFromCenter(layer, val) {
    if (version >= 72) {
        layer.setShouldConstrainProportions(false);
        var center = layer.midY();
        var result = layer.frame().height() > val * -1 ? layer.frame().height() + val : 1;
        layer.frame().setHeight(result);
        layer.setMidY(center);
    } else {
        layer.setConstrainProportions(false);
        var center = layer.frame().midY();
        var result = layer.frame().height() > val * -1 ? layer.frame().height() + val : 1;
        layer.frame().setHeight(result);
        layer.frame().setMidY(center);
    }
}