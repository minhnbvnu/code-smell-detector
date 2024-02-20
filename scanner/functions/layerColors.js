function layerColors(gc, colors, x, y, width, height, foundationColor) {
    for (var i = 0; i < colors.length; i++) {
        if (foundationColor && !i) {
            gc.clearFill(x, y, width, height, colors[i]);
        } else {
            gc.cache.fillStyle = colors[i];
            gc.fillRect(x, y, width, height);
        }
    }
}