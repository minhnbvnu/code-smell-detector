function _rowColfromParent(extent, zoom) {
    const diffLevel = extent.zoom - zoom;
    const diff = 2 ** diffLevel;
    r.invDiff = 1 / diff;

    r.row = (extent.row - (extent.row % diff)) * r.invDiff;
    r.col = (extent.col - (extent.col % diff)) * r.invDiff;
    return r;
}