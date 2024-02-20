function loadDailyActiveUsers() {
    NLU_log_stats.query({ path: 'activeUserCountLast30Days' }, function (data) {
      const users_data = [];
      let avg_act_users = 0;
      $scope.activeusers_labels = [];
      $scope.activeusers_series = ['Active'];
      for (let i = 0; i < data.length; i++) {
        $scope.activeusers_labels.push(data[i].month_date);
        users_data.push(data[i].user_count);
        avg_act_users = avg_act_users + Number(data[i].user_count);
      }
      $scope.avg_active_users = Number(avg_act_users / data.length).toFixed(0);
      $scope.activeusers_data = [users_data];
    });
  }