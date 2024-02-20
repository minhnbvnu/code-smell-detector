function renderTable ( table ) {

    var tableHtml = [];

    //构造数据
    for ( var i = 0, row; row = table.rows[ i ]; i++ ) {

        tableData[ i ] = [];
        tableHtml[ i ] = [];

        for ( var j = 0, cell; cell = row.cells[ j ]; j++ ) {

            var value = getCellValue( cell );

            if ( i > 0 && j > 0 ) {
                value = +value;
            }

            if ( i === 0 || j === 0 ) {
                tableHtml[ i ].push( '<th>'+ value +'</th>' );
            } else {
                tableHtml[ i ].push( '<td><input type="text" class="data-item" value="'+ value +'"></td>' );
            }

            tableData[ i ][ j ] = value;

        }

        tableHtml[ i ] = tableHtml[ i ].join( "" );

    }

    //draw 表格
    $( "#tableContainer" ).html( '<table id="showTable" border="1"><tbody><tr>'+ tableHtml.join( "</tr><tr>" ) +'</tr></tbody></table>' );

}