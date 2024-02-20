function loadLogs() {
    //console.log ("GETTING LOGS");

    $ionicLoading.show({
      template: $translate.instant('kLoading'),
      noBackdrop: true,
      duration: zm.loadingTimeout

    });

    if ($scope.logEntity == $rootScope.appName) {
      $fileLogger.getLogfile().then(function (l) {

          $scope.log.logString = l.split('\n').reverse().join('\n');
          //$scope.log.logString = l;

          $ionicLoading.hide();
        },
        function (error) {
          $scope.log.logString = "Error getting log: " + JSON.stringify(error);
          $ionicLoading.hide();
        });
    } else
      loadZMlogs();

  }