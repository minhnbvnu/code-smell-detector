function getCleaned2DArray(table, array) {
    var returnArray = [];

    $.each(array, function(i,row) {
        if(table.handsontable('isEmptyRow', i) === true) {
            return true; // continue
        }

        $.each(row, function(j,column) {
           if (column !== null && column !== "") {
              returnArray.push(array[i]);
              return false;  // false causes each to stop looping over columns
           }
        });
    });

    return returnArray;
}