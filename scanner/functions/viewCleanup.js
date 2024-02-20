function viewCleanup() {

    if (viewCleaned) {
      NVR.debug("Montage History View Cleanup was already done, skipping");
      return;
    }


    $interval.cancel($rootScope.eventQueryInterval);
    if (pckry) pckry.destroy();


    broadcastHandles = [];

    areStreamsStopped = true;

    $timeout(function () {

      NVR.debug("Killing all streams in montage to save memory/nw...");
      for (var i = 0; i < $scope.MontageMonitors.length; i++) {
        if ($scope.MontageMonitors[i].Monitor.listDisplay == 'show' && $scope.MontageMonitors[i].Monitor.eventUrl != 'img/noimage.png') NVR.killLiveStream($scope.MontageMonitors[i].Monitor.connKey, $scope.MontageMonitors[i].Monitor.controlURL, $scope.MontageMonitors[i].Monitor.Name);

      }

    });

  }