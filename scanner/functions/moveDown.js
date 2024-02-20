function moveDown(grid, detail) {
    var cellEvent = detail.editor.event,
        gridX = cellEvent.visibleColumn.index;

    // Select first visible grid cell of this column
    grid.selectViewportCell(gridX, 0);
    grid.takeFocus();
}