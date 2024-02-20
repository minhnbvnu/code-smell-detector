function doubleClickDelay(grid, event) {
    var columnProperties;

    return (
        event.isHeaderCell &&
        !(columnProperties = event.columnProperties).unsortable &&
        columnProperties.sortOnDoubleClick &&
        300
    );
}