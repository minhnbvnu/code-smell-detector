function drawpie(configData) {
  const {
    colorData,
    legendData,
    numberData,
    // formatter,
    id,
    padding
  } = configData
  const myChart = echarts.init(document.getElementById(id))
  const seriesData = []
  numberData.map((item, index) => {
    seriesData.push({
      value: numberData[index],
      name: legendData[index],
      itemStyle: {
        normal: {
          label: {
            color: colorData[index]
          }
        }
      }
    })
  })

  myChart.setOption({
    backgroundColor: '#fff',
    legend: {
      show: false,
      orient: 'vertical',
      top: '85%',
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20,
      textStyle: {
        fontSize: 12,
        color: '#000000'
      },
      selectedMode: false
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['20%', '45%'],
        // minAngle: 60, // 设置最小角度会有 bug
        // startAngle: 270, // 起始角度
        avoidLabelOverlap: true, // 是否启用防止标签重叠策略
        center: ['50%', '50%'],
        data: seriesData,
        animation: false,
        labelLine: {
          normal: {
            length: 16,
            length2: 90,
            lineStyle: {
              width: 0.5
            }
          }
        },
        label: {
          // 此处为指示线文字
          normal: {
            formatter: '{b|{b}}\n\n',
            padding: [0, padding],
            borderWidth: 10,
            borderRadius: 4,
            rich: {
              b: {
                fontSize: 10,
                lineHeight: 6,
                align: 'center'
              }
            }
          }
        }
      }
    ],
    color: colorData
  })
}