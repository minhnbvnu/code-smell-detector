function initEvent () {

    var cacheValue = null,
        //图表类型数
        typeViewCount = chartsConfig.length- 1,
        $chartsTypeViewBox = $( '#scrollBed .view-box' );

    $( ".charts-format" ).delegate( ".format-ctrl", "change", function () {

        renderCharts();

    } )

    $( ".table-view" ).delegate( ".data-item", "focus", function () {

        cacheValue = this.value;

    } ).delegate( ".data-item", "blur", function () {

        if ( this.value !== cacheValue ) {
            renderCharts();
        }

        cacheValue = null;

    } );

    $( "#buttonContainer" ).delegate( "a", "click", function (e) {

        e.preventDefault();

        if ( this.getAttribute( "data-title" ) === 'prev' ) {

            if ( currentChartType > 0 ) {
                currentChartType--;
                updateViewType( currentChartType );
            }

        } else {

            if ( currentChartType < typeViewCount ) {
                currentChartType++;
                updateViewType( currentChartType );
            }

        }

    } );

    //图表类型变化
    $( '#scrollBed' ).delegate( ".view-box", "click", function (e) {

        var index = $( this ).attr( "data-chart-type" );
        $chartsTypeViewBox.removeClass( "selected" );
        $( $chartsTypeViewBox[ index ] ).addClass( "selected" );

        currentChartType = index | 0;

        //饼图， 禁用部分配置
        if ( currentChartType === chartsConfig.length - 1 ) {

            disableNotPieConfig();

        //启用完整配置
        } else {

            enableNotPieConfig();

        }

        renderCharts();

    } );

}