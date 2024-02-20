function getSeriesForPieChart () {

    var series = {
            type: 'pie',
            name: $("#tipInput").val(),
            data: []
        },
        tableData = getTableData();


    for ( var j = 1, jlen = tableData[ 0 ].length; j < jlen; j++ ) {

        var title = tableData[ 0 ][ j ],
            val = tableData[ 1 ][ j ];

        series.data.push( [ title, val ] );

    }

    return {
        series: [ series ]
    };

}