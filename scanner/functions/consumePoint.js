function consumePoint(point, anchor) {
    point.row -= anchor.row;
    if (point.row == 0)
        point.column -= anchor.column;
}