function processMonitorStatus () {

        //array('Unknown','NotRunning','Running','NoSignal','Signal'),


       // console.log (JSON.stringify($scope.monitors));
        for (var j=0; j < $scope.monitors.length; j++) {

          if ($scope.monitors[j].Monitor_Status.Status == 'Connected') {
            $scope.monitors[j].Monitor.isRunning = "true";
            $scope.monitors[j].Monitor.color = zm.monitorRunningColor;
            $scope.monitors[j].Monitor.char = "ion-checkmark-circled";
            $scope.monitors[j].Monitor.isRunningText = $scope.monitors[j].Monitor_Status.Status;
          }
          else {
            $scope.monitors[j].Monitor.isRunning = "false";
            $scope.monitors[j].Monitor.color = zm.monitorNotRunningColor;
            $scope.monitors[j].Monitor.char = "ion-close-circled";
            $scope.monitors[j].Monitor.isRunningText = $scope.monitors[j].Monitor_Status.Status;
          }
          
        }

      }