function getTotalLogEntries() {
    NLU_log_stats.get({ path: 'total_log_entries' }, function(data) {
      $scope.total_log_entries = data.total_log_entries;
    });
  }