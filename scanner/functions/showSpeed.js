function showSpeed() {
    var myChart = echarts.init(document.getElementById("container"));
    myChart.setOption({
        series: [{
            type: 'gauge',
            anchor: {
                show: true,
                showAbove: true,
                size: 18,
                itemStyle: {
                    color: '#FAC858'
                }
            },
            pointer: {
                icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
                width: 8,
                length: '80%',
                offsetCenter: [0, '8%']
            },

            progress: {
                show: true,
                overlap: true,
                roundCap: true
            },
            axisLine: {
                roundCap: true
            },
            data: [{
                    value: 0,
                    name: 'CPU',
                    title: {
                        offsetCenter: ['-20%', '80%']
                    },
                    detail: {
                        offsetCenter: ['-20%', '95%']
                    }
                },
                {
                    value: 0,
                    name: '内存',
                    title: {
                        offsetCenter: ['20%', '80%']
                    },
                    detail: {
                        offsetCenter: ['20%', '95%']
                    }
                }
            ],
            title: {
                fontSize: 14
            },
            detail: {
                width: 40,
                height: 14,
                fontSize: 14,
                color: '#fff',
                backgroundColor: 'auto',
                borderRadius: 3,
                formatter: '{value}%'
            }
        }]
    });
    return myChart;
}