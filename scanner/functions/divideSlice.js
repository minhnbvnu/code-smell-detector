function divideSlice(slice, horizontal, vertical) {
    var x = slice.frame.x;
    var y = slice.frame.y;
    var width = slice.frame.width;
    var height = slice.frame.height;
    var maxX = x + width;
    var maxY = y + height;
    var cellHeight = horizontal.type == "count" ? Math.floor(height / horizontal.value) : horizontal.value;
    var cellWidth = vertical.type == "count" ? Math.floor(width / vertical.value) : vertical.value;
    var i = 1;
    for (var _y = y; _y < maxY; _y += cellHeight) {
        for (var _x = x; _x < maxX; _x += cellWidth) {
            var newSlice = slice.duplicate();
            newSlice.name += "_" + i;
            newSlice.frame.x = _x;
            newSlice.frame.y = _y;
            if (_x + cellWidth > maxX) {
                newSlice.frame.width = maxX - _x;
            } else {
                newSlice.frame.width = cellWidth;
            }
            if (_y + cellHeight > maxY) {
                newSlice.frame.height = maxY - _y;
            } else {
                newSlice.frame.height = cellHeight;
            }
            i ++;
        }
    }
    slice.remove();
}