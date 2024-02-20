function adjustHeightFromBottom(layer, val) {
    if (version >= 72) {
        layer.setShouldConstrainProportions(false);
        var bottom = layer.maxY();
        var result = layer.frame().height() > val * -1 ? layer.frame().height() + val : 1;
        layer.frame().setHeight(result);
        layer.setMaxY(bottom);
    } else {
        layer.setConstrainProportions(false);
        var bottom = layer.frame().maxY();
        var result = layer.frame().height() > val * -1 ? layer.frame().height() + val : 1;
        layer.frame().setHeight(result);
        layer.frame().setMaxY(bottom);
    }
}