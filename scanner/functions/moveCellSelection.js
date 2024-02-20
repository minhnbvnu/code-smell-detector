function moveCellSelection(grid) {
    var rows;

    if (
        grid.properties.collapseCellSelections &&
        grid.properties.singleRowSelectionMode && // let's only attempt this when in this mode
        !grid.properties.multipleSelections && // and only when in single selection mode
        (rows = grid.getSelectedRows()).length && // user just selected a row (must be single row due to mode we're in)
        grid.selectionModel.getSelections().length  // there was a cell region selected (must be the only one)
    ) {
        var rect = grid.selectionModel.getLastSelection(), // the only cell selection
            x = rect.left,
            y = rows[0], // we know there's only 1 row selected
            width = rect.right - x,
            height = 0, // collapse the new region to occupy a single row
            fireSelectionChangedEvent = false;

        grid.selectionModel.select(x, y, width, height, fireSelectionChangedEvent);
        grid.repaint();
    }
}