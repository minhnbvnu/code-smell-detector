function getSeriesAndCategories () {

    var form = document.forms[ 'data-form' ],
        series = [],
        categories = [],
        tmp = [],
        tableData = getTableData();

    //反转数据
    if ( getTableDataFormat() === "-1" ) {

        for ( var i = 0, len = tableData.length; i < len; i++ ) {

            for ( var j = 0, jlen = tableData[ i ].length; j < jlen; j++ ) {

                if ( !tmp[ j ] ) {
                    tmp[ j ] = [];
                }

                tmp[ j ][ i ] = tableData[ i ][ j ];

            }

        }

        tableData = tmp;

    }

    categories = tableData[0].slice( 1 );

    for ( var i = 1, data; data = tableData[ i ]; i++ ) {

        series.push( {
            name: data[ 0 ],
            data: data.slice( 1 )
        } );

    }

    return {
        series: series,
        categories: categories
    };

}