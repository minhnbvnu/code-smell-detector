function getSingleStreamMode() {
    if (currentStreamState == streamState.SNAPSHOT_LOWQUALITY) return 'single';
    return $scope.isModalStreamPaused ? 'single' : 'jpeg';
  }