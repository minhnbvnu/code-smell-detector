function scheduleRemoveFlash(id) {
      NVR.debug("Scheduled a " + zm.alarmFlashTimer + "ms timer for dis-alarming monitor ID:" + $scope.MontageMonitors[id].Monitor.Id);
      $timeout(function () {
        $scope.MontageMonitors[id].Monitor.isAlarmed = false;
        NVR.debug("dis-alarming monitor ID:" + $scope.MontageMonitors[id].Monitor.Id);
      }, zm.alarmFlashTimer);
    }