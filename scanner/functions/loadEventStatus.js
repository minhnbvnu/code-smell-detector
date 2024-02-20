function loadEventStatus(showMontageSidebars) {
      // console.log ("LOADING EVENT STATUS");

      if (!NVR.getLogin().enableMontageOverlays) {
        //NVR.debug ("not loading events, as overlay is off");
        return;
      }

      for (var i = 0; i < $scope.MontageMonitors.length; i++) {
        if ($scope.MontageMonitors[i].Monitor.Enabled == 0 ||
          $scope.MontageMonitors[i].Monitor.listDisplay == 'noshow' ||
          $scope.MontageMonitors[i].Monitor.Function == 'None') continue;
        getEventStatus($scope.MontageMonitors[i], showMontageSidebars);
      }
    }