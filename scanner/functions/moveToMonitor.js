function moveToMonitor(m, d) {
    if ($scope.isZoneEdit) {
      NVR.log("Not cycling, as you are editing zones");
      return;
    }

    if ($scope.monitors.length <= 1) {
      NVR.log("Not cycling, as you only have at most 1 monitors");
      return;
    }

    $scope.animationInProgress = true;
    var curstate = $ionicHistory.currentStateName();
    var found = 0;
    var mid = NVR.getNextMonitor(m, d);

    $scope.showPTZ = false;

    // FIXME: clean this up - in a situation where
    // no monitors are enabled, will it loop for ever?
    do {
      mid = NVR.getNextMonitor(m, d);
      m = mid;
      //console.log("Next Monitor is " + m);

      found = 0;
      for (var i = 0; i < $scope.monitors.length; i++) {
        if ($scope.monitors[i].Monitor.Id == mid &&
          // if you came from monitors, then ignore noshow
          ($scope.monitors[i].Monitor.listDisplay != 'noshow' || curstate == "monitors") &&
          $scope.monitors[i].Monitor.Function != 'None') {
          found = 1;
          //console.log(mid + "is part of the monitor list");
          NVR.debug("ModalCtrl: swipe detected, moving to " + mid);
          break;
        } else {
          NVR.debug("skipping " + $scope.monitors[i].Monitor.Id +
            " listDisplay=" + $scope.monitors[i].Monitor.listDisplay +
            " Function=" + $scope.monitors[i].Monitor.Function +
            " Enabled=" + $scope.monitors[i].Monitor.Enabled);
        }
      }
    } while (found != 1);

    // now kill stream and set up next
    NVR.debug("Killing stream before we move on to next monitor...");

    $scope.isModalStreamPaused = true;
    var element = angular.element(document.getElementById("monitorimage"));
    var slidein;
    var slideout;
    $timeout(function () {
      NVR.killLiveStream($scope.connKey, $scope.controlURL);

      // we should now have a paused stream, time to animate out
      var dirn = d;
      if (dirn == 1) {
        slideout = "animated slideOutLeft";
        slidein = "animated slideInRight";
      } else {
        slideout = "animated slideOutRight";
        slidein = "animated slideInLeft";
      }

      element.addClass(slideout)
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', outWithOld);
    });

    function outWithOld() {
      NVR.log(">>>Old image out");
      // NVR.log("ModalCtrl:Stopping network pull...");
      //NVR.stopNetwork("MonitorModal-outwithOld");
      $scope.rand = Math.floor((Math.random() * 100000) + 1);

      $timeout(function () {
        element.removeClass(slideout);
        element.addClass(slidein)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', inWithNew);

        $scope.monitorId = mid;
        $scope.monitorName = NVR.getMonitorName(mid);
        $scope.monitor = NVR.getMonitorObject(mid);
        $scope.controlURL = $scope.monitor.Monitor.controlURL;
        $scope.zoneArray = [];
        $scope.circlePoints = [];
        // getZones();
        configurePTZ($scope.monitorId);
      }, 200);
    }

    function inWithNew() {
      element.removeClass(slidein);
      $scope.isModalStreamPaused = false;

      var ld = NVR.getLogin();
      carouselUtils.setStop(false);
      $scope.connKey = NVR.genConnKey();
      $scope.animationInProgress = false; // has to be AFTER new connkey
      NVR.log("<<<New image loaded in with ck:" + $scope.connKey);
    }

    $ionicLoading.hide();
  }