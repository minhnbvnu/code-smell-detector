function cardChartCtrl1($scope) {
  $scope.onlineusers = 1110;

  $scope.labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July'
  ];
  $scope.data = [[65, 59, 84, 84, 51, 55, 40]];
  $scope.colors = [
    {
      backgroundColor: brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  $scope.options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          gridLines: {
            color: 'transparent',
            zeroLineColor: 'transparent'},
          ticks: {
            fontSize: 2,
            fontColor: 'transparent'}
        }
      ],
      yAxes: [
        {
          display: false,
          ticks: {
            display: false,
            min: Math.min.apply(Math, $scope.data[0]) - 5,
            max: Math.max.apply(Math, $scope.data[0]) + 5}}
      ]
    },
    elements: {
      line: {
        borderWidth: 1},
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4}
    }
  };
}