function checkAllEvents() {
    //console.log("Timer:Events are checked....");

    //if (pckry && !$scope.isDragabillyOn) pckry.shiftLayout();

    for (var i = 0; i < $scope.MontageMonitors.length; i++) {
      // don't check for monitors that are not shown
      // because nph connkey won't exist and the response
      // will fail
      if ($scope.MontageMonitors[i].Monitor.eventUrl != "" && $scope.MontageMonitors[i].Monitor.eventUrl != 'img/noimage.png' && $scope.MontageMonitors[i].Monitor.connKey != '' && $scope.MontageMonitors[i].Monitor.Function != 'None' && $scope.MontageMonitors[i].Monitor.listDisplay != 'noshow' &&
      $scope.MontageMonitors[i].Monitor.eventType == "jpeg") {
        // NVR.debug("Checking event status for " + $scope.MontageMonitors[i].Monitor.Name + ":" + $scope.MontageMonitors[i].Monitor.eventUrl + ":" + $scope.MontageMonitors[i].Monitor.Function + ":" + $scope.MontageMonitors[i].Monitor.listDisplay);
        // console.log ("Sending query 99 for " + $scope.MontageMonitors[i].Monitor.Name + " with ck="+$scope.MontageMonitors[i].Monitor.connKey);
       controlEventStream('99', '', $scope.MontageMonitors[i].Monitor.connKey, i);
      }
    }
  }