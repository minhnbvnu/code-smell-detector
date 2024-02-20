function strikeThrough(config, gc, text, x, y, thickness) {
    var textWidth = gc.getTextWidth(text);

    switch (gc.cache.textAlign) {
        case 'center':
            x -= textWidth / 2;
            break;
        case 'right':
            x -= textWidth;
            break;
    }

    y = Math.round(y) + 0.5;

    gc.cache.lineWidth = thickness;
    gc.moveTo(x - 1, y);
    gc.lineTo(x + textWidth + 1, y);
}