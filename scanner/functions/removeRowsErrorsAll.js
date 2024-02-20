function removeRowsErrorsAll(table) {
    var removedRows = 0;

    for(var col = 0; col < table.handsontable("countCols"); col++) {
        removedRows += removeRowsWithErrorInCol(table, col);
    }

    alert("Removed " + removedRows + " rows");
}