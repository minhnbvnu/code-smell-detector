function getRunStatus() {
    NVR.debug("StateCtrl/getRunStatus: " + apiRun);
    $http.get(apiRun)
      .then(
        function (success) {
          NVR.debug("StateCtrl/getRunStatus: success");
          NVR.debug("Run results: " + JSON.stringify(success));
          switch (success.data.result) {
            case 1:
              $scope.zmRun = $translate.instant('kZMRunning');
              $scope.color = 'green';
              break;
            case 0:
              $scope.zmRun = $translate.instant('kZMStopped');
              $scope.color = 'red';
              break;
            default:
              $scope.zmRun = $translate.instant('kZMUndetermined');
              $scope.color = 'orange';

              break;
          }

          // console.log("X"+success.data.result+"X");
        },
        function (error) {
          //console.log("ERROR in getRun: " + JSON.stringify(error));
          NVR.log("Error getting RunStatus " + JSON.stringify(error), "error");
          $scope.color = 'red';
          $scope.zmRun = $translate.instant('kZMUndetermined');
        }
      );

  }