function displayCharts(){

    nv.addGraph(function() {
        poolWorkerChart = nv.models.stackedAreaChart()
            .margin({left: 40, right: 40})
            .x(function(d){ return d[0] })
            .y(function(d){ return d[1] })
            .useInteractiveGuideline(true)
            .clipEdge(true);

        poolWorkerChart.xAxis.tickFormat(timeOfDayFormat);

        poolWorkerChart.yAxis.tickFormat(d3.format('d'));

        d3.select('#poolWorkers').datum(poolWorkerData).call(poolWorkerChart);

        return poolWorkerChart;
    });


    nv.addGraph(function() {
        poolHashrateChart = nv.models.lineChart()
            .margin({left: 60, right: 40})
            .x(function(d){ return d[0] })
            .y(function(d){ return d[1] })
            .useInteractiveGuideline(true);

        poolHashrateChart.xAxis.tickFormat(timeOfDayFormat);

        poolHashrateChart.yAxis.tickFormat(function(d){
            return getReadableHashRateString(d);
        });

        d3.select('#poolHashrate').datum(poolHashrateData).call(poolHashrateChart);

        return poolHashrateChart;
    });


    nv.addGraph(function() {
        poolBlockChart = nv.models.multiBarChart()
            .x(function(d){ return d[0] })
            .y(function(d){ return d[1] });

        poolBlockChart.xAxis.tickFormat(timeOfDayFormat);

        poolBlockChart.yAxis.tickFormat(d3.format('d'));

        d3.select('#poolBlocks').datum(poolBlockData).call(poolBlockChart);

        return poolBlockChart;
    });
}