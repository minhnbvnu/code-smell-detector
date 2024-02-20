function cellSelect(event) {
    if (!font) return;
    var firstGlyphIndex = pageSelected * cellCount,
        cellIndex = +event.target.id.substr(1),
        glyphIndex = firstGlyphIndex + cellIndex;
    if (glyphIndex < font.numGlyphs) {
        displayGlyph(glyphIndex);
        displayGlyphData(glyphIndex);
    }
}