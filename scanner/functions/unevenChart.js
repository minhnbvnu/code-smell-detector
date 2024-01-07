function unevenChart() {
      window.acquireChart({
        type: 'bar',
        data: {
          labels: [1, 2],
          datasets: [
            {data: [1, 2]},
            {data: [1, 2, 3]},
          ]
        },
        options: {
          skipNull: true,
        }
      });
    }