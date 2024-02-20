function getMinHeightFromLayers(layers) {
    var layers = layers.mutableCopy().sort(function(a, b) {
        return a.frame().height() - b.frame().height();
    });
    return layers.firstObject().frame().height();
}