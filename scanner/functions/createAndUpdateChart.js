function createAndUpdateChart() {
      var chart = acquireChart({
        data: {
          labels: ['q'],
          datasets: [
            {
              id: 'dismissed',
              label: 'Test before',
              yAxisID: 'count',
              data: [816],
              type: 'bar',
              stack: 'stack'
            }
          ]
        },
        options: {
          scales: {
            count: {
              axis: 'y',
              type: 'linear'
            }
          }
        }
      });

      chart.data = {
        datasets: [
          {
            id: 'tests',
            yAxisID: 'count',
            label: 'Test after',
            data: [38300],
            type: 'bar'
          }
        ],
        labels: ['q']
      };

      chart.update();
    }