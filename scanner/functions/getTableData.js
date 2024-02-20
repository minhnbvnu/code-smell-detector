function getTableData () {

    var table = document.getElementById( "showTable" ),
        xCount = table.rows[0].cells.length - 1,
        values = getTableInputValue();

    for ( var i = 0, value; value = values[ i ]; i++ ) {

        tableData[ Math.floor( i / xCount ) + 1 ][ i % xCount + 1 ] = values[ i ];

    }

    return tableData;

}