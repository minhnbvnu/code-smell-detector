function appendColumns(table, newColumnsSettings, newColumnHeaders) {
    var columnHeaderNames = table.handsontable('getColHeader');
    var columnsSettings = table.handsontable('getSettings').columns;

    columnHeaderNames.push.apply(columnHeaderNames, newColumnHeaders);
    columnsSettings.push.apply(columnsSettings, newColumnsSettings);

    table.handsontable('updateSettings',
        {
            keepCellSettings: true,
            columns: columnsSettings,
            colHeaders: function (col) {
                return columnHeaderNames[col];
            }
        }
    );
}