function displayGlyphData(glyphIndex) {
    var container = document.getElementById('glyph-data');
    var holdtext = document.getElementById('copy-char');

    if (glyphIndex < 0) {
        container.innerHTML = '';
        return;
    }
    var glyph = font.glyphs.glyphs[glyphIndex],
        html;
    html = '<div><dt>name</dt><dd>' + glyph.name + '</dd></div>';

    if (glyph.unicodes.length > 0) {
        html += '<div><dt>unicode</dt><dd>' + glyph.unicodes.map(formatUnicode).join(', ') + '</dd></div>';
        holdtext.value = String.fromCharCode(parseInt(glyph.unicodes.map(formatUnicode)[0], 16));
    }

    html += '<div><dt>index</dt><dd>' + glyph.index + '</dd></div>';

    if (glyph.xMin !== 0 || glyph.xMax !== 0 || glyph.yMin !== 0 || glyph.yMax !== 0) {
        html += '<div><dt>xMin</dt><dd>' + glyph.xMin + '</dd></div>' +
            '<div><dt>xMax</dt><dd>' + glyph.xMax + '</dd></div>' +
            '<div><dt>yMin</dt><dd>' + glyph.yMin + '</dd></div>' +
            '<div><dt>yMax</dt><dd>' + glyph.yMax + '</dd></div>';
    }
    html += '<div><dt>advWidth</dt><dd>' + glyph.advanceWidth + '</dd></div>';
    if (glyph.leftSideBearing !== undefined) {
        html += '<div><dt>leftBearing</dt><dd>' + glyph.leftSideBearing + '</dd></div>';
    }
    container.innerHTML = html;
}