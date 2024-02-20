function artboardWithLayer(width, height, layer) {
    var artboard = MSArtboardGroup.alloc().initWithFrame(CGRectMake(0, 0, width, height));
    artboard.addLayer(layer);
    return artboard;
}