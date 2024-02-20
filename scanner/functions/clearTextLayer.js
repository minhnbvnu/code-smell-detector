function clearTextLayer(renderer) {
    var lines = renderer.$textLayer.$lines;
    lines.cells.forEach(clear);
    lines.cellCache.forEach(clear);
    function clear(cell) {
        var style = cell.element.style;
        style.direction = style.textAlign = style.width = "";
    }
}