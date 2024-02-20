function copyHandsOnTableCol(table, sourceColIndex, targetColIndex) {

    var totalRows = table.handsontable('countRows');
    var sourceData = table.handsontable('getData', 0, sourceColIndex, totalRows - 1, sourceColIndex);
    var targetData = [];

    for(var rowCounter = 0; rowCounter < totalRows; rowCounter++) {
        targetData.push([rowCounter, targetColIndex, sourceData[rowCounter][0]]) ;
    }

    table.handsontable('setDataAtCell', targetData);
}