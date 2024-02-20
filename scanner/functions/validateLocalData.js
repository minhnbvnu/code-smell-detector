function validateLocalData(table, progress, validationFunction, cleanedDataArray, targetColumns) {
    var duplicates = validationFunction.apply(undefined, [cleanedDataArray, targetColumns]);
    var totalCols = table.handsontable('countCols');

    for(var counter in duplicates) {
        var duplicateRowNumber = duplicates[counter][0];
        var duplicateRow = duplicates[counter][1];
        var offsetRow = parseInt(duplicateRowNumber) + 1;
        var offsetDuplicates = [];

        for(var counter = 0; counter < duplicateRow[0].length; counter++) {
            offsetDuplicates.push(parseInt(duplicateRow[0][counter]) + 1);
        }

        //var message = "At row " + offsetRow + ": Warning: Locally duplicate rows [" + offsetDuplicates + "] compared to columns [" + duplicateRow[1] + "]";
        var message = "At row " + offsetRow + ": Warning: Local duplicate row compared to columns [" + duplicateRow[1] + "]";
        createLiStatusElement(progress.find('#local_duplicates'), message, parseInt(duplicateRowNumber), -1, true);

        for(var col = 0; col < totalCols; col++) {
            var cellMeta = table.handsontable('getCellMeta', duplicateRowNumber, col);
            addClass(cellMeta, "htLDuplicate");
            cellMeta.title += message;
        }
    }
}