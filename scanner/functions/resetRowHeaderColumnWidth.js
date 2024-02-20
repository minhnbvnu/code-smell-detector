function resetRowHeaderColumnWidth(gc, rowCount) {
    var columnProperties = this.grid.behavior.getColumnProperties(this.grid.behavior.rowColumnIndex),
        gridProps = this.grid.properties,
        width = 2 * columnProperties.cellPadding;

    // Checking images.checked also supports a legacy feature in which checkbox could be hidden by undefining the image.
    if (gridProps.rowHeaderCheckboxes && images.checked) {
        width += images.checked.width;
    }

    if (gridProps.rowHeaderNumbers) {
        var cellProperties = columnProperties.rowHeader;
        gc.cache.font = cellProperties.foregroundSelectionFont.indexOf('bold ') >= 0
            ? cellProperties.foregroundSelectionFont
            : cellProperties.font;

        width += gc.getTextWidth(rowCount);
    }

    columnProperties.preferredWidth = columnProperties.width = width;
}