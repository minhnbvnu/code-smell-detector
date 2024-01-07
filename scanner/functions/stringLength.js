function stringLength(text, font, size) {
    const w = stringWidth(text, font);
    // if (!font) {
    //     font = '_default_';
    // }
    // if (!fontHeight[font]) {
    //     fontHeight[font] = getFontHeight(font);
    // }
    // return new Size(w, fontHeight[font]);
    return new Size(w, size || DEFAULT_TEXT_SIZE);
}