function renderMultiLineText(gc, config, val, leftPadding, rightPadding) {
    var x = config.bounds.x,
        y = config.bounds.y,
        width = config.bounds.width,
        height = config.bounds.height,
        cleanVal = (val + '').trim().replace(WHITESPACE, ' '), // trim and squeeze whitespace
        lines = findLines(gc, config, cleanVal.split(' '), width);

    if (lines.length === 1) {
        return renderSingleLineText(gc, config, cleanVal, leftPadding, rightPadding);
    }

    var halignOffset = leftPadding,
        valignOffset = config.voffset,
        halign = config.halign,
        textHeight = gc.getTextHeight(config.font).height;

    switch (halign) {
        case 'right':
            halignOffset = width - rightPadding;
            break;
        case 'center':
            halignOffset = width / 2;
            break;
    }

    var hMin = 0, vMin = Math.ceil(textHeight / 2);

    valignOffset += Math.ceil((height - (lines.length - 1) * textHeight) / 2);

    halignOffset = Math.max(hMin, halignOffset);
    valignOffset = Math.max(vMin, valignOffset);

    gc.cache.save(); // define a clipping region for cell
    gc.beginPath();
    gc.rect(x, y, width, height);
    gc.clip();

    gc.cache.textAlign = halign;
    gc.cache.textBaseline = 'middle';

    for (var i = 0; i < lines.length; i++) {
        gc.simpleText(lines[i], x + halignOffset, y + valignOffset + (i * textHeight));
    }

    gc.cache.restore(); // discard clipping region

    return width;
}