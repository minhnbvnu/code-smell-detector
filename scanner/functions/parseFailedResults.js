function parseFailedResults(result, table, errors, isShowIcons)
{
    for(var failedRowCounter = 0; failedRowCounter < result.failedRows.length; failedRowCounter++) {
        var offsetRow = result.failedRows[failedRowCounter].row - 1;
        var col = result.failedRows[failedRowCounter].col;

        if(col >= 0) {
            var offsetCol = getColumnIndexFromName(table, result.failedRows[failedRowCounter].label);
            var cellMeta = table.handsontable('getCellMeta', offsetRow, offsetCol);
            cellMeta.title += result.failedRows[failedRowCounter].message;
            addClass(cellMeta, "htInvalid");
        }
        if(col < 0) {
            // Highlight the entire row due to error
            var totalCols = table.handsontable("countCols");
            for(var colCounter = 0; colCounter < totalCols; colCounter++) {
                var cellMeta = table.handsontable('getCellMeta', offsetRow, colCounter);
                cellMeta.title += result.failedRows[failedRowCounter].message;
                addClass(cellMeta, "htInvalid");
            }
        }

        createLiStatusElement(errors, result.failedRows[failedRowCounter].message, offsetRow, col, isShowIcons);
    }
}