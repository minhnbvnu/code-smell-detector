function getIsEmptyRowFunction(table) {
    return function(row) {
        /*var classes = table.handsontable('getCellMeta', row, 0).classes;
        if (typeof classes === 'undefined' || classes.indexOf("modified") === -1) {
            return true;
        }*/

        var rowData = table.handsontable('getDataAtRow', row);

        for(var col = 0; col < rowData.length; col++) {
            if(rowData[col] !== null && rowData[col] !== "") {
                return false;
            }
        }

        return true;
    };
}