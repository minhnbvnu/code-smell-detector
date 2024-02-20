function getRawByteCoords(event, rowContainer, charMeasure, colCount, rowCount) {
    var coords = getCoords(event, rowContainer, charMeasure, colCount, rowCount);
    var x = coords[0];
    var y = coords[1];
    x += 32;
    y += 32;
    return { x: x, y: y };
}