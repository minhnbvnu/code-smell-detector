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