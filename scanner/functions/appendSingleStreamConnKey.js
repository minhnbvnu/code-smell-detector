function appendSingleStreamConnKey() {
    return $scope.isModalStreamPaused ? "" : "&connkey=" + $scope.connKey;

  }