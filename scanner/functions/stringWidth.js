function stringWidth(text, font) {
    if (stringWidth.node) {
        return stringWidth.node(text, font);
    }
    rulerCtx.font = font;
    return rulerCtx.measureText(text).width;
}