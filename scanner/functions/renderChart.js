function renderChart ( container, typeConfig, config ) {


        $( container ).highcharts( $.extend( {}, typeConfig, {

            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            title: {
                text: config.title,
                x: -20 //center
            },
            subtitle: {
                text: config.subTitle,
                x: -20
            },
            xAxis: {
                title: {
                    text: config.xTitle
                },
                categories: config.categories
            },
            yAxis: {
                title: {
                    text: config.yTitle
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                enabled: true,
                valueSuffix: config.suffix
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 1
            },
            series: config.series

        } ));

    }