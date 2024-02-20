function onFontLoaded(font) {
    window.font = font;

    var w = cellWidth - cellMarginLeftRight * 2,
        h = cellHeight - cellMarginTop - cellMarginBottom,
        head = font.tables.head,
        maxHeight = head.yMax - head.yMin;
    fontScale = Math.min(w / (head.xMax - head.xMin), h / maxHeight);
    fontSize = fontScale * font.unitsPerEm;
    fontBaseline = cellMarginTop + h * head.yMax / maxHeight;

    var pagination = document.getElementById("pagination");
    pagination.innerHTML = '';
    var fragment = document.createDocumentFragment();
    var numPages = Math.ceil(font.numGlyphs / cellCount);
    for (var i = 0; i < numPages; i++) {
        var link = document.createElement('div');
        var lastIndex = Math.min(font.numGlyphs - 1, (i + 1) * cellCount - 1);
        link.textContent = i * cellCount + ' → ' + lastIndex;
        link.id = 'p' + i;
        link.className = 'page';
        link.addEventListener('click', pageSelect, false);
        fragment.appendChild(link);
        // A white space allows to break very long lines into multiple lines.
        // This is needed for fonts with thousands of glyphs.
        fragment.appendChild(document.createTextNode(' '));
    }
    pagination.appendChild(fragment);

    displayFontBasic(font);
    initGlyphDisplay();
    displayGlyphPage(0);
    displayGlyph(-1);
    displayGlyphData(-1);
}