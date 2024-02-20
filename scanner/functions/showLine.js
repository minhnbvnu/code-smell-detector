function showLine(ip) {
    clearInterval(window.counterInterval);
    window.fetch("/system/GetCounterHistory?ip="+ip, {
        credentials: 'include',
        method: 'GET',
        mode: 'cors'
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        var myChart = echarts.init(document.getElementById("container-cpu"));
        myChart.setOption({
            visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0
            }],
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
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                },
                max: 100
            },
            legend: {
                data: ['CPU使用率', '内存使用率']
            },
            series: [{
                name: 'CPU使用率',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data.cpu,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }, {
                name: '内存使用率',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data.mem,
                markPoint: {
                    data: [
                        { type: 'max', name: '最大值' },
                        { type: 'min', name: '最小值' }
                    ]
                },
                markLine: {
                    data: [
                        { type: 'average', name: '平均值' }
                    ]
                }
            }]
        });
        var rateChart = showSpeed();
        var ioChart = showIO(data);
        window.counterInterval = setInterval(function() {
            DotNet.invokeMethodAsync('Masuit.MyBlogs.Core', 'GetCurrentPerformanceCounter').then(item => {
                data.cpu.push([item.time, item.cpuLoad.toFixed(2)]);
                data.mem.push([item.time, item.memoryUsage.toFixed(2)]);
                data.read.push([item.time, item.diskRead.toFixed(2)]);
                data.write.push([item.time, item.diskWrite.toFixed(2)]);
                data.up.push([item.time, item.upload.toFixed(2)]);
                data.down.push([item.time, item.download.toFixed(2)]);
                myChart.setOption({
                    series: [{
                        data: data.cpu
                    }, {
                        data: data.mem
                    }]
                });
                ioChart.setOption({
                    series: [{
                        data: data.read
                    }, {
                        data: data.write
                    }, {
                        data: data.up
                    }, {
                        data: data.down
                    }]
                });
                let option = rateChart.getOption();
                option.series[0].data[0].value = item.cpuLoad.toFixed(2);
                option.series[0].data[1].value = item.memoryUsage.toFixed(2);
                rateChart.setOption(option, true);
            });
        }, 2000);
    }).catch(function(e) {
        console.error(e);
    });
}