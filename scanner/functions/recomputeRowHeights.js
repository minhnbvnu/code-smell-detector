function recomputeRowHeights() {
      switchThumbClass();
      setRowHeight();
      $scope.eventsBeingLoaded = true;
      $timeout (function() {
        NVR.debug ("recomputing all row heights");
        for (var i = 0; i < $scope.events.length; i++) {
          $scope.events[i].Event.rowHeight = eventRowHeight;
          var tempMon = NVR.getMonitorObject($scope.events[i].Event.MonitorId);
          if (tempMon != undefined) {
            var mw = parseInt(tempMon.Monitor.Width);
            var mh = parseInt(tempMon.Monitor.Height);
            var mo = parseInt(tempMon.Monitor.Orientation);
            var th = computeThumbnailSize(mw, mh, mo);
            $scope.events[i].Event.thumbWidth = th.w;
            $scope.events[i].Event.thumbHeight = th.h;
          }
        }
      },10);
    
      NVR.debug ('giving time for collection to redraw...');
        $scope.eventsBeingLoaded = false;
        $timeout(function() {
          NVR.debug ('ready for next resize');
        },300);  

    }