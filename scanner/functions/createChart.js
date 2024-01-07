function createChart() {
      return window.acquireChart({
        type: 'bar',
        data: {
          labels: [0, 1, 2, 3, 4, 5, 6, 7, '7+'],
          datasets: [{
            data: [29.05, 4, 15.69, 11.69, 2.84, 4, 0, 3.84, 4],
          }],
        },
        options: {
          plugins: false,
          layout: {
            padding: {top: 30, left: 1, right: 1, bottom: 1}
          }
        }
      }, {
        canvas: {
          height: 0,
          width: 0
        }
      });
    }