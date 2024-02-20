function animatedLineChart(id, color) {
    var lineChart = echarts.init(document.getElementById(id));

    function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
            name: now.toString(),
            value: [
                [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
                Math.round(value)
            ]
        };
    }
    var data = [];
    var now = new Date(2010, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
        data.push(randomData());
    }
    var option = {
        color: [color],
        title: {
            text: null
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(params) {
                params = params[0];
                var date = new Date(params.name);
                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
                animation: false
            }
        },
        xAxis: {
            show: false,
            type: 'time',
            splitLine: {
                show: false
            }
        },
        yAxis: {
            show: false,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            }
        },
        series: [{
            name: 'Serie A',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: data
        }]
    };
    lineChart.setOption(option);
    setInterval(function() {
        for (var i = 0; i < 5; i++) {
            data.shift();
            data.push(randomData());
        }
        lineChart.setOption({
            series: [{
                data: data
            }]
        });
    }, 1000);
}