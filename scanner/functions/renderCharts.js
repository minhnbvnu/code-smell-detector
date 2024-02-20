function renderCharts () {

    var data = collectData();

    $('#chartsContainer').highcharts( $.extend( {}, chartsConfig[ currentChartType ], {

        credits: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: data.title,
            x: -20 //center
        },
        subtitle: {
            text: data.subTitle,
            x: -20
        },
        xAxis: {
            title: {
                text: data.xTitle
            },
            categories: data.categories
        },
        yAxis: {
            title: {
                text: data.yTitle
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            enabled: true,
            valueSuffix: data.suffix
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 1
        },
        series: data.series

    } ));

}