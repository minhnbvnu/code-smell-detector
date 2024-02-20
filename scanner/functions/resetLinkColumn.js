function resetLinkColumn(table) {
    var linkColumnIndex = getColumnIndexFromName(table, LINK_COLUMN_NAME);
    if(linkColumnIndex !== -1) {
        var totalRows = table.handsontable('countRows');
        var targetData = [];

        var linkData = table.handsontable('getData', 0, linkColumnIndex, totalRows - 1, linkColumnIndex);
        for(var row = 0; row < totalRows; row++) {
            if(typeof linkData[row][0] !== "undefined" && linkData[row][0] !== null) {
                targetData.push([row, linkColumnIndex, null]) ;
            }
        }

        table.handsontable('setDataAtCell', targetData, "ignore");
    }
}