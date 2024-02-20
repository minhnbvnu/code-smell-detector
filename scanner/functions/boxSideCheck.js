function boxSideCheck(mousePos, x1, x2, y1, y2) {
    return pointRectangleIntersection({x: mousePos.x, y:mousePos.y}, {x1: x1-BOX_ANCHOR, x2: x2+BOX_ANCHOR, y1: y1-BOX_ANCHOR, y2: y2+BOX_ANCHOR})
}