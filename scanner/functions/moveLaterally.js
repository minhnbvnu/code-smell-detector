function moveLaterally(grid, detail, deltaX) {
    var cellEvent = detail.editor.event,
        gridX = cellEvent.visibleColumn.index,
        gridY = cellEvent.visibleRow.index,
        originX = gridX,
        C = grid.renderer.visibleColumns.length;

    cellEvent = new grid.behavior.CellEvent; // redefine so we don't reset the original below

    while (
        (gridX = (gridX + deltaX + C) % C) !== originX &&
        cellEvent.resetGridXY(gridX, gridY)
    ) {
        if (cellEvent.properties.filterable) {
            // Select previous or next filterable column's filter cell
            grid.editAt(cellEvent);
            return;
        }
    }

    moveDown(grid, cellEvent);
}