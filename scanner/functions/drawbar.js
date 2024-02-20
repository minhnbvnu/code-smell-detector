function drawbar(dataX, dataY, id) {
  // console.log('drawBar执行啦12');
  dataX = dataX === undefined ? [] : dataX
  dataY = dataY === undefined ? [] : dataY
  const myChart = echarts.init(document.getElementById(id))
  myChart.setOption({
    backgroundColor: '#F7F8FA',
    grid: {
      left: '-6%',
      right: '0%',
      bottom: '2%',
      top: '5%',
      containLabel: true
    },
    yAxis: {
      show: false,
      axisLabel: {},
      type: 'value',
      boundaryGap: [0, 0.01],
      axisLine: {
        lineStyle: {
          color: '#EEEEEE'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(0,0,0,0)'
        }
      }
    },
    xAxis: {
      type: 'category',
      axisLabel: {
        interval: 0,
        // rotate:-20,
        // showMaxLabel:true,
        textStyle: {
          fontSize: 10
        }
      },
      boundaryGap: true,
      data: dataX,
      axisLine: {
        lineStyle: {
          color: '#EEEEEE'
        }
      },

      axisTick: {
        show: false
      }
    },
    series: [
      {
        name: '2011年',
        type: 'bar',
        data: dataY,
        barWidth: 21,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgb(128,109,248)' },
              { offset: 1, color: 'rgb(68,127,247)' }
            ]),
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: 'rgb(128,109,248)'
              }
            }
          }
        }
      }
    ],
    textStyle: {
      color: '#54657E'
    }
  })
  // console.log("执行啦");
}