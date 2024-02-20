function parseSuccessfulResults(result, table, progress, isShowIcons, linkData, messages) {

    var linkColumnIndex = getColumnIndexFromName(table, LINK_COLUMN_NAME);

    for(var thisRow = 0; thisRow < result.successfulRows.length; thisRow++) {
        var totalCols = table.handsontable("countCols");
        var offsetRow = result.successfulRows[thisRow].row - 1;
        var status = result.successfulRows[thisRow].s;

        if(typeof result.successfulRows[thisRow].message !== "undefined") {
            if(status === StatusEnum.DUPLICATE) {
                createLiStatusElement(progress.find('#duplicates'), result.successfulRows[thisRow].message, offsetRow, -1, isShowIcons);
            } else {
                createLiStatusElement(progress.find('#messages'), result.successfulRows[thisRow].message, offsetRow, -1, false);
                messages.append(result.successfulRows[thisRow].message + '<br>');
            }
        }

        if(linkColumnIndex !== -1 && typeof result.successfulRows[thisRow].message !== "undefined") {
            var escaped = Handsontable.helper.stringify(result.successfulRows[thisRow].message);
            var matched = escaped.match(/href="([^"]*)/);

            if(matched && matched.length > 1) {
                linkData.push([offsetRow, linkColumnIndex, matched[1]]);
            }
        }

        // Highlight the entire row, due to a success
        for(var thisCol = 0; thisCol < totalCols; thisCol++) {
            var cellMeta = table.handsontable('getCellMeta', offsetRow, thisCol);

            removeClass(cellMeta, "htPending");
            removeClass(cellMeta, "htInvalid");

            if(status === StatusEnum.DUPLICATE) {
                addClass(cellMeta, "htDuplicate");
            } else {
                addClass(cellMeta, "htSuccess");
            }

            if(typeof result.successfulRows[thisRow].message !== "undefined") {
                cellMeta.title += result.successfulRows[thisRow].message;
            }
        }
    }
}