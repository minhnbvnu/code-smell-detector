function removeRowsWithErrorInCol(table, col) {
    var removedRows = 0;
    var rows = [];

    for(var row = table.handsontable("countRows"); row >= 0; row--) {
        var cellMeta = table.handsontable('getCellMeta', row, col);

        if (typeof cellMeta.classes !== 'undefined' && cellMeta.classes.indexOf("htInvalid") !== -1) {
            rows.push(row);
            removedRows++;
        }
    }

    if(removedRows > 0) {
        table.handsontable('alter', 'remove_rows', rows);
    }

    return removedRows;
}