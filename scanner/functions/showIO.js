function showIO(data) {
    var myChart = echarts.init(document.getElementById("container-io"));
    myChart.setOption({
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                animation: false
            }
        },
        dataZoom: [{
                type: 'inside',
                start: 70,
                end: 100,
                minValueSpan: 100
            }, {
                start: 70,
                end: 100,
                minValueSpan: 100
            }],
        xAxis: {
            type: 'time',
            interval: 20000,
            axisLabel: {
                formatter:function (value){
                    var dt=new Date(value);
                    return dt.getHours()+":"+dt.getMinutes()+":"+dt.getSeconds()
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [{
                name: '磁盘',
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            {
                name: '网络',
                type: 'value',
                splitLine: {
                    show: false
                }
            }
        ],
        legend: {
            data: ['磁盘读(KBps)', '磁盘写(KBps)', "网络上行(KBps)", "网络下行(KBps)"]
        },
        series: [{
                name: '磁盘读(KBps)',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data.read
            }, {
                name: '磁盘写(KBps)',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data.write
            }, {
                name: '网络上行(KBps)',
                yAxisIndex: 1,
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data.up
            }, {
                name: '网络下行(KBps)',
                yAxisIndex: 1,
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data.down
            }]
    });
    return myChart;
}