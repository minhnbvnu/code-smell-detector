function collectData () {

    var form = document.forms[ 'data-form' ],
        data = null;

    if ( currentChartType !== chartsConfig.length - 1 ) {

        data = getSeriesAndCategories();
        $.extend( data, getUserConfig() );

    //饼图数据格式
    } else {
        data = getSeriesForPieChart();
        data.title = form[ 'title' ].value;
        data.suffix = form[ 'unit' ].value;
    }

    return data;

}