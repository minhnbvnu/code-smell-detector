function getCleanedData(table, appendDict) {
    var returnArray = [];
    var dataArray = table.handsontable('getData');
    var colHeaderArray = [];
    var totalColumns = table.handsontable('countCols');

    for(var i = 0; i < totalColumns; i++) {
        colHeaderArray.push(table.handsontable('getColHeader', i).replace(/<(?:.|\n)*?>/gm, ''));
    }

    $.each(dataArray, function(i,row) {
        /*if (! table.find("tr:eq(" + (i+ 1) + ") td").hasClass("modified")) {
            returnArray[i] = null;
            return true; // continue
        }*/

        if(table.handsontable('isEmptyRow', i) === false) {
            returnArray[i] = {};

            $.each(row, function(j,column) {
                if(dataArray[i][j] !== null && dataArray[i][j] !== "") {
                    returnArray[i][colHeaderArray[j]] = dataArray[i][j];
                }
            });

            if(appendDict !== null) {
                for(key in appendDict) {
                    returnArray[i][key] = appendDict[key];
                }
            }
        }
    });

    return returnArray;
}