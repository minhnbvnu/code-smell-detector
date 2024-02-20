function prepareGlyphList() {
    var marker = document.getElementById('glyph-list-end'),
        parent = marker.parentElement;
    for (var i = 0; i < cellCount; i++) {
        var canvas = document.createElement('canvas');
        hidpi(canvas, cellWidth, cellHeight);
        canvas.className = 'item';
        canvas.id = 'g' + i;
        canvas.addEventListener('click', cellSelect, false);
        parent.insertBefore(canvas, marker);
    }
}