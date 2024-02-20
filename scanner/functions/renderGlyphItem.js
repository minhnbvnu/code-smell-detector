function renderGlyphItem(canvas, glyphIndex) {
    var cellMarkSize = 6;
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, cellWidth, cellHeight);
    if (glyphIndex >= font.numGlyphs) return;

    ctx.fillStyle = '#AAA';
    ctx.font = '9px "Open Sans"';
    ctx.fillText(glyphIndex, 2, cellHeight - 2);
    var glyph = font.glyphs.glyphs[glyphIndex],
        glyphWidth = glyph.advanceWidth * fontScale,
        xmin = (cellWidth - glyphWidth) / 2,
        xmax = (cellWidth + glyphWidth) / 2,
        x0 = xmin;

    // ctx.fillStyle = '#e67e22';
    // ctx.fillRect(xmin - cellMarkSize + 2, fontBaseline, cellMarkSize, 2);
    // ctx.fillRect(xmin, fontBaseline, 2, cellMarkSize);
    // ctx.fillRect(xmax, fontBaseline, cellMarkSize, 2);
    // ctx.fillRect(xmax, fontBaseline, 2, cellMarkSize);

    ctx.fillStyle = '#FFFFFF';

    var path = glyph.getPath(x0, fontBaseline, fontSize);
    path.fill = "#333";
    path.draw(ctx);
}