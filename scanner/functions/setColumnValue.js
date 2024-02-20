function setColumnValue(table, targetColumnName, columnValue, startRow) {
    var totalRows = table.handsontable('countRows') - 1;
    var targetColumnIndex = getColumnIndexFromName(table, targetColumnName);
    var data = [];

    if(typeof startRow === "undefined") {
        startRow = 0;
    }

    for(var rowCounter = startRow; rowCounter < totalRows; rowCounter++) {
        data.push([rowCounter, targetColumnIndex, columnValue]);
    }

    table.handsontable('setDataAtCell', data);
}