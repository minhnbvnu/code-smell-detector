function $updateMarkers(delta) {
    var isInsert = delta.action == "insert";
    var start = delta.start;
    var end = delta.end;
    var rowShift = (end.row - start.row) * (isInsert ? 1 : -1);
    var colShift = (end.column - start.column) * (isInsert ? 1 : -1);
    if (isInsert) end = start;

    for (var i in this.marks) {
        var point = this.marks[i];
        var cmp = comparePoints(point, start);
        if (cmp < 0) {
            continue; // delta starts after the range
        }
        if (cmp === 0) {
            if (isInsert) {
                if (point.bias == 1) {
                    cmp = 1;
                }
                else {
                    point.bias == -1;
                    continue;
                }
            }
        }
        var cmp2 = isInsert ? cmp : comparePoints(point, end);
        if (cmp2 > 0) {
            point.row += rowShift;
            point.column += point.row == end.row ? colShift : 0;
            continue;
        }
        if (!isInsert && cmp2 <= 0) {
            point.row = start.row;
            point.column = start.column;
            if (cmp2 === 0)
                point.bias = 1;
        }
    }
}