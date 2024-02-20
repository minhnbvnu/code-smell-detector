function performZMoperation(str) {

    NVR.debug("inside performZMoperation with " + str);

    $scope.zmRun = "...";
    $scope.color = 'orange';
    $scope.customState = "";
    NVR.debug("StateCtrl/controlZM: POST Control command is " + apiExec + str + ".json");
    inProgress = 1;
    $http.post(apiExec + str + ".json?"+$rootScope.authSession)
      .then(
        function (success) {
          NVR.debug("StateCtrl/controlZM: returned success with:"+JSON.stringify(success));
          inProgress = 0;
          switch (str) {
            case "stop":
              $scope.zmRun = $translate.instant('kZMStopped');
              $scope.color = 'red';
              break;
            default:
              $scope.zmRun = $translate.instant('kZMRunning');
              $scope.color = 'green';
              getCurrentState();
              break;

          }

        },
        function (error) {
          //if (error.status) // it seems to return error with status 0 if ok
          // {
          //console.log("ERROR in Change State:" + JSON.stringify(error));
          NVR.debug("StateCtrl/controlZM: returned error");
          NVR.log("Error in change run state:" + JSON.stringify(error), "error");
          $scope.zmRun = $translate.instant('kZMUndetermined');
          $scope.color = 'orange';
          inProgress = 0;

        });
  }