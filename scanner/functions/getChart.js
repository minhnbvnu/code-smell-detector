function getChart(data) {
      return window.acquireChart({
        type: 'line',
        data: data,
        options: {
          scales: {
            x: {
              ticks: {
                autoSkip: true
              }
            }
          }
        }
      });
    }