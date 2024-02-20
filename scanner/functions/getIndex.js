function getIndex(mid) {
      var ndx = 0;
      for (var i = 0; i < $scope.MontageMonitors.length; i++) {
        if ($scope.MontageMonitors[i].Monitor.Id == mid) {
          ndx = i;
          break;
        }
      }
      return ndx;
    }