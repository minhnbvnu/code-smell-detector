function removeRowsWithClass(table, clazz) {
    var removedRows = 0;
    var ht = table.handsontable("getInstance");
    var rows = [];

    for(var row = table.handsontable("countRows") - 1; row >= 0; row--) {
        var cellMeta = ht.getCellMeta(row, 0);

        if (ht.isEmptyRow(row) === false && cellMeta.classes.indexOf(clazz) !== -1) {
            rows.push(row);
            removedRows++;
        }
    }

    if(removedRows > 0) {
        table.handsontable('alter', 'remove_rows', rows);
    }

    return removedRows;
}