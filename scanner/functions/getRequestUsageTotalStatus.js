function getRequestUsageTotalStatus() {
    NLU_log_stats.get({ path: 'request_usage_total' }, function(data) {
      $scope.request_processed = data.total_request_usage;
    });
  }