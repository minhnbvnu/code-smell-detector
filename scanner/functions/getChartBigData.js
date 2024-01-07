function getChartBigData(maxTicksLimit) {
      return window.acquireChart({
        type: 'line',
        data: {
          labels: new Array(300).fill('red'),
          datasets: [{
            data: new Array(300).fill(5),
          }]
        },
        options: {
          scales: {
            x: {
              ticks: {
                autoSkip: true,
                maxTicksLimit
              }
            }
          }
        }
      });
    }