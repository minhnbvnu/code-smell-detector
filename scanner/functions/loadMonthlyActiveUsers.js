function loadMonthlyActiveUsers() {
    NLU_log_stats.query({ path: 'activeUserCountLast12Months' }, function (
      data
    ) {
      const users_data = [];
      let avg_act_users = 0;
      $scope.activeusers_labels = [];
      $scope.activeusers_series = ['Active'];
      for (let i = 0; i < data.length; i++) {
        $scope.activeusers_labels.push(data[i].month_year);
        users_data.push(data[i].count_users);
        avg_act_users = avg_act_users + Number(data[i].count_users).toFixed(0);
      }
      $scope.activeusers_data = [users_data];
      $scope.avg_active_users = Number(avg_act_users / data.length).toFixed(0);
    });
  }