function restorePoint(point, anchor) {
    if (point.row == 0)
        point.column += anchor.column;
    point.row += anchor.row;
}