function removeRowsSelectedCol(table) {
    var col = table.handsontable('getSelected')[1];

    var removedRows = removeRowsWithErrorInCol(table, col);

    alert("Removed " + removedRows + " rows");
}