function forceDaemonCheck() {
        var apiMonCheck;

        $scope.loginData = NVR.getLogin();

        // The status is provided by zmdc.pl
        // "not running", "pending", "running since", "Unable to connect"
        var i;
        for (i = 0; i < $scope.monitors.length; i++) {
          (function (j) {
            $scope.monitors[j].Monitor.isRunningText = "...";
            $scope.monitors[j].Monitor.isRunning = "...";
            $scope.monitors[j].Monitor.color = zm.monitorCheckingColor;
            $scope.monitors[j].Monitor.char = "ion-help-circled";
            apiMonCheck = $scope.loginData.apiurl + "/monitors/daemonStatus/id:" + $scope.monitors[j].Monitor.Id + "/daemon:zmc.json?"+$rootScope.authSession;

           
            NVR.debug("MonitorCtrl:monitorStateCheck: " + apiMonCheck);
            //console.log("**** ZMC CHECK " + apiMonCheck);
            $http.get(apiMonCheck)
              .then(function (data) {
                  data = data.data;
                  NVR.debug("MonitorCtrl: monitor check state returned: " + JSON.stringify(data));
                  if (data.statustext.indexOf("not running") > -1) {
                    $scope.monitors[j].Monitor.isRunning = "false";
                    $scope.monitors[j].Monitor.color = zm.monitorNotRunningColor;
                    $scope.monitors[j].Monitor.char = "ion-close-circled";
                  } else if (data.statustext.indexOf("pending") > -1) {
                    $scope.monitors[j].Monitor.isRunning = "pending";
                    $scope.monitors[j].Monitor.color = zm.monitorPendingColor;
                  } else if (data.statustext.indexOf("running since") > -1) {
                    $scope.monitors[j].Monitor.isRunning = "true";
                    $scope.monitors[j].Monitor.color = zm.monitorRunningColor;
                    $scope.monitors[j].Monitor.char = "ion-checkmark-circled";
                  } else if (data.statustext.indexOf("Unable to connect") > -1) {
                    $scope.monitors[j].Monitor.isRunning = "false";
                    $scope.monitors[j].Monitor.color = zm.monitorNotRunningColor;
                    $scope.monitors[j].Monitor.char = "ion-close-circled";
                  }

                  $scope.monitors[j].Monitor.isRunningText = data.statustext;
                },
                function (data) {
                  NVR.debug("MonitorCtrl: Error->monitor check state returned: " +
                    JSON.stringify(data));
                  NVR.displayBanner('error', [$translate.instant('kErrorRetrievingState'), $translate.instant('kPleaseTryAgain')]);
                  $scope.monitors[j].Monitor.isRunning = "error";
                  $scope.monitors[j].Monitor.color = zm.monitorErrorColor;
                  $scope.monitors[j].Monitor.char = "ion-help-circled";
                });

          })(i);
        }
      }