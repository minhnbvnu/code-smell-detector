function syncTableData () {

    var tableData = getTableData();

    for ( var i = 1, row; row = editorTable.rows[ i ]; i++ ) {

        for ( var j = 1, cell; cell = row.cells[ j ]; j++ ) {

            cell.innerHTML = tableData[ i ] [ j ];

        }

    }

}