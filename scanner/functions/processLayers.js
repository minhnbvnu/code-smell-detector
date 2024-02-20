function processLayers(iCanvas) {
    return function (layer, callback) {
        async.compose(
            AsyncRenderer.processImage(layer.filters),
            AsyncRenderer.processMask(layer.mask),
            AsyncRenderer.load(iCanvas, layer)
        )(null, callback);
    };
}