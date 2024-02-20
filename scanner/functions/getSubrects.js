function getSubrects() {
    var dw = this.dataWindow;
    if (!this.grid.properties.fetchSubregions) {
        var rect = this.grid.newRectangle(dw.left, dw.top, dw.width, dw.height); // convert from InclusiveRect
        return [rect];
    }

    var orderedColumnIndexes = this.visibleColumns.map(function(vc) { return vc.column.index; }).sort(intComparator),
        xMin = orderedColumnIndexes[0],
        width = orderedColumnIndexes[orderedColumnIndexes.length - 1] - xMin + 1;

    return [this.grid.newRectangle(xMin, dw.top, width, dw.height)];
}