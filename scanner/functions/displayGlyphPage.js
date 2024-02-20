function displayGlyphPage(pageNum) {
    pageSelected = pageNum;
    document.getElementById('p' + pageNum).className = 'page-selected page';
    var firstGlyph = pageNum * cellCount;
    for (var i = 0; i < cellCount; i++) {
        renderGlyphItem(document.getElementById('g' + i), firstGlyph + i);
    }
}