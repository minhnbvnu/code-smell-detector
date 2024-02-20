function usageChartCtrl($scope, NLU_log, NLU_log_stats) {
  NLU_log_stats.query({ path: 'intent_usage_by_day' }, function(data) {
    const elements = data.length;
    const data1 = [];
    const labels = [];

    for (let i = 0; i <= elements - 1; i++) {
      labels.push(data[i].day);
      data1.push(data[i].cnt);
    }

    $scope.labels = labels;
    $scope.series = ['Processed'];
    $scope.data = [data1];
    $scope.colors = [
      {
        backgroundColor: convertHex(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: '#fff'}
    ];
    $scope.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              callback: function(value) {
                return value;
              }}
          }
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(
                (Math.max.apply(Math, data1) +
                  Math.max.apply(Math, data1) / 10) /
                  5
              ),
              max: Math.ceil(
                Math.max.apply(Math, data1) + Math.max.apply(Math, data1) / 10
              )
            }
          }
        ]
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3}
      }
    };
  });
}