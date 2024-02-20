function getTransformedLayerData(iCanvas, layer, rect) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.translate(-rect.x, -rect.y);
    transformLayer(ctx, iCanvas, layer);
    ctx.drawImage(layer.img, 0, 0);
    return ctx.getImageData(0, 0, rect.width, rect.height);
}