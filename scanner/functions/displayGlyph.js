function displayGlyph(glyphIndex) {
    var canvas = document.getElementById('glyph'),
        ctx = canvas.getContext('2d');
    if (!resolveDisplayGlyph) {
        hidpi(canvas, canvas.width, canvas.height);
        resolveDisplayGlyph = true;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (glyphIndex < 0) return;

    var glyph = font.glyphs.glyphs[glyphIndex],
        glyphWidth = glyph.advanceWidth * glyphScale,
        xmin = (canvas.width / window.devicePixelRatio - glyphWidth) / 2,
        xmax = (canvas.width / window.devicePixelRatio + glyphWidth) / 2,
        x0 = xmin,
        markSize = 10;

    ctx.fillStyle = '#14bfff';
    ctx.fillRect(xmin - markSize + 1, glyphBaseline, markSize, 2);
    ctx.fillRect(xmin, glyphBaseline, 2, markSize);
    ctx.fillRect(xmax, glyphBaseline, markSize, 2);
    ctx.fillRect(xmax, glyphBaseline, 2, markSize);
    ctx.textAlign = 'center';
    ctx.fillText('0', xmin, glyphBaseline + markSize + 10);
    ctx.fillText(glyph.advanceWidth, xmax, glyphBaseline + markSize + 10);

    ctx.fillStyle = '#FFFFFF';
    var path = glyph.getPath(x0, glyphBaseline, glyphSize);
    path.fill = '#2a3340';
    path.stroke = '#677a95';
    path.strokeWidth = 1;
    drawPathWithArrows(ctx, path);
    drawPoints(glyph, ctx, x0, glyphBaseline, glyphSize);
}