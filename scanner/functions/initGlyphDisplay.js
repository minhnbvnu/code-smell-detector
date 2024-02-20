function initGlyphDisplay() {
    var glyphBgCanvas = document.getElementById('glyph-bg'),
        ctx = glyphBgCanvas.getContext('2d');

    if (!resolveGlyphDpi) {
        hidpi(glyphBgCanvas, glyphBgCanvas.width, glyphBgCanvas.height);
        resolveGlyphDpi = true;
    }

    var w = glyphBgCanvas.width,
        h = 300,
        glyphW = w - glyphMargin * 2,
        glyphH = h - glyphMargin * 2,
        head = font.tables.head,
        maxHeight = head.yMax - head.yMin;

    glyphScale = Math.min(glyphW / (head.xMax - head.xMin), glyphH / maxHeight);
    glyphSize = glyphScale * font.unitsPerEm;
    glyphBaseline = glyphMargin + glyphH * head.yMax / maxHeight;

    function hline(text, yunits) {
        ypx = glyphBaseline - yunits * glyphScale;
        ctx.fillStyle = '#788b94';
        ctx.font = 'bold 12px "Open Sans"';
        ctx.fillText(text.toUpperCase(), 2, ypx + 3);
        ctx.fillStyle = 'rgba(255,255,255,0.12)';
        ctx.fillRect(90, ypx, w, 1);
    }

    ctx.clearRect(0, 0, w, glyphBgCanvas.height);
    hline('Baseline', 0);
    hline('yMax', font.tables.head.yMax);
    hline('yMin', font.tables.head.yMin);
    hline('Ascender', font.tables.os2.sTypoAscender);
    hline('Descender', font.tables.os2.sTypoDescender);
}