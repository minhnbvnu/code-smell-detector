function drawline(dataX, dataY, id) {
  dataX = dataX === undefined ? [] : dataX
  dataY = dataY === undefined ? [] : dataY
  const myChart = echarts.init(document.getElementById(id))
  myChart.clear()
  myChart.setOption({
    backgroundColor: '#fff',
    grid: {
      left: '12',
      right: '14',
      top: '12%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      boundaryGap: false,
      interval: 5000,
      type: 'category',
      axisLabel: {
        color: '#999999',
        fontSize: 10
      },
      data: dataX,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#F7F8FA'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#F2F6F7'],
          width: 1,
          type: 'solid'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#F2F6F7'],
          width: 1,
          type: 'solid'
        }
      },
      axisLabel: {
        color: '#999999',
        fontSize: 10
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#F2F6F7'
        }
      },
      axisTick: {
        show: false
      }
    },
    series: [
      {
        id: 'a',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: dataY,
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(54,112,227,0.4)' },
              { offset: 1, color: 'rgba(54,112,227,0.03)' }
            ])
          }
        },
        itemStyle: {
          normal: {
            label: {
              show: true,
              fontSize: 10,
              color: '#3670E3',
              fontWeight: '540',
              textBorderColor: '#fff',
              textBorderWidth: 2
            },
            borderColor: '#3670E3',
            borderWidth: 0,
            color: '#626AF6',
            lineStyle: {
              color: '#626AF6',
              width: 1.5
            }
          }
        }
      }
    ],
    textStyle: {
      color: '#54657E'
    }
  })
}