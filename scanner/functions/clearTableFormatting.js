function clearTableFormatting(table, progress, errors, totalRows) {
    errors.empty();
    progress.find('#initial').empty();
    progress.find('#status').empty();
    progress.find('.status_tabs div').empty();

    resetLinkColumn(table);

    progress.find('#status').attr('data-processed', 0);
    progress.find('#initial').html("Processing a total of " + totalRows + " rows. <img style='width: 20px', src=\"/images/waiting.gif\"/>");

    var rows = table.handsontable('countRows');
    var cols = table.handsontable('countCols');

    for(var row = 0; row < rows; row++) {
        for(var col = 0; col < cols; col++) {
            var cellMeta = table.handsontable('getCellMeta', row, col);
            removeClass(cellMeta, "htInvalid");
            removeClass(cellMeta, "htSuccess");
            removeClass(cellMeta, "htPending");
            removeClass(cellMeta, "htDuplicate");
            removeClass(cellMeta, "htLDuplicate");
            cellMeta.title = "";
        }
    }

    setClickMessageToRow(table, progress.find('#errors'));
    setClickMessageToRow(table, progress.find('#duplicates'));
    setClickMessageToRow(table, progress.find('#local_duplicates'));
    setClickMessageToRow(table, progress.find('#messages'));

    updateResultsCounts(progress);
}