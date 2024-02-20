function getClickLiSelectFunction(table) {

    return function() {
        var row = $(this).data('row');
        var col = $(this).data('col');

        if(col >= 0) {
            table.handsontable("selectCell", row, col);
        } else {
            var endCol = table.handsontable("countCols") - 1;
            table.handsontable("selectCell", row, 0, row, endCol);
        }
    };
}