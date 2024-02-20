function adjustWidthFromCenter(layer, val) {
    if (version >= 72) {
        layer.setShouldConstrainProportions(false);
        var center = layer.midX();
        var result = layer.frame().width() > val * -1 ? layer.frame().width() + val : 1;
        layer.frame().setWidth(result);
        layer.setMidX(center);
    } else {
        layer.setConstrainProportions(false);
        var center = layer.frame().midX();
        var result = layer.frame().width() > val * -1 ? layer.frame().width() + val : 1;
        layer.frame().setWidth(result);
        layer.frame().setMidX(center);
    }
}