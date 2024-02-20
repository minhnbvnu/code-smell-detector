function adjustWidthFromRight(layer, val) {
    if (version >= 72) {
        layer.setShouldConstrainProportions(false);
        var right = layer.maxX();
        var result = layer.frame().width() > val * -1 ? layer.frame().width() + val : 1;
        layer.frame().setWidth(result);
        layer.setMaxX(right);
    } else {
        layer.setConstrainProportions(false);
        var right = layer.frame().maxX();
        var result = layer.frame().width() > val * -1 ? layer.frame().width() + val : 1;
        layer.frame().setWidth(result);
        layer.frame().setMaxX(right);
    }
}