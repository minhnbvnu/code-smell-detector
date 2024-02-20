function setUserConfig ( config ) {

    var form = document.forms[ 'data-form' ];

    config.title && ( form[ 'title' ].value = config.title );
    config.subTitle && ( form[ 'sub-title' ].value = config.subTitle );
    config.xTitle && ( form[ 'x-title' ].value = config.xTitle );
    config.yTitle && ( form[ 'y-title' ].value = config.yTitle );
    config.suffix && ( form[ 'unit' ].value = config.suffix );
    config.dataFormat == "-1" && ( form[ 'charts-format' ][ 1 ].checked = true );
    config.tip && ( form[ 'tip' ].value = config.tip );
    currentChartType = config.chartType || 0;

}