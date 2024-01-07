function drawImageMarker(ctx, image, point, symbol) {
    let w = symbol && symbol['markerWidth'];
    if (!isNumber(w)) {
        w = image.width;
    }
    let h = symbol && symbol['markerHeight'];
    if (!isNumber(h)) {
        h = image.height;
    }
    Canvas.image(ctx, image, point, symbol['markerWidth'] || image.width, symbol['markerHeight'] || image.height);
}