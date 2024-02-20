function sendCmd(mid, cmd, extra) {

    var m = -1;
    for (var i = 0; i < $scope.MontageMonitors.length; i++) {
      if ($scope.MontageMonitors[i].Monitor.Id == mid) {
        m = i;
        break;
      }
    }
    if (m != -1) {
      NVR.debug("Sending CMD:" + cmd + " for monitor " + $scope.MontageMonitors[m].Monitor.Name);
      return controlEventStream(cmd, "", $scope.MontageMonitors[m].Monitor.connKey, -1, extra);
    }

  }