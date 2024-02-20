function setRowHeight() {
        var prevMonRatio = 0;
        var tempMonHeight = 0;
        monitorHeight = 0;
        for (var i=0; i < $scope.monitors.length; i++) {
          if ($scope.monitors[i] != undefined) {
            var mw = $scope.monitors[i].Monitor.Width;
            var mh = $scope.monitors[i].Monitor.Height;
            var mo = $scope.monitors[i].Monitor.Orientation;
            if (mw/mh > prevMonRatio) {
                var th = computeThumbnailSize(mw, mh, mo);
                tempMonHeight = th.h;
            }
            prevMonRatio = mw/mh;
          }
        }
        monitorHeight = tempMonHeight;

        var ld = NVR.getLogin();
        var rowHeight = 134; // ViewThumbs == none
        if (ld.eventViewThumbs != 'none') {
          if (ld.eventViewThumbsSize == 'large') {
            // 167 is the minimum size w need to not cut off buttons in large mode
            rowHeight = Math.max(monitorHeight + 144, 167);
          }
          else {
            // 156 is the minimum size w need to not cut off buttons in large mode
            rowHeight = Math.max (monitorHeight + 82, 156);
          }
        }
        eventRowHeight = rowHeight;
    }