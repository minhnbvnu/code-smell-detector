function getRemoveLiSelectFunction(table) {
    return function() {
        var row = $(this).closest('li').data('row');
        table.handsontable('alter', 'remove_row', row);
    };
}