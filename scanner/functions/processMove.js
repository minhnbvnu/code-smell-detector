function processMove(eid, dirn) {
    var ld = NVR.getLogin();
    if (!ld.canSwipeMonitors) return;


    // NVR.log("using zms to move ");

    if (currentStreamState == streamState.ACTIVE && ($scope.defaultVideo == '' || $scope.defaultVideo == 'undefined')) {
      // need to kill zms
      currentStreamState = streamState.STOPPED;
      $timeout(function () {
        NVR.killLiveStream($scope.connKey);

      });

    }

    if ($scope.defaultVideo != "" && $scope.defaultVideo != 'undefined') {

      if (handle) {

        NVR.debug("Clearing video feed...");
        handle.stop();
        handle.clearMedia();


      }

      playerReady = false;
      $scope.defaultVideo = "";
      $scope.video_url = "";
      $scope.videoObject = {};
      $scope.videoIsReady = false;

    }



    if (dirn == 1) {
      NVR.debug("Moving to:" + $scope.nextId);
      prepareModalEvent($scope.nextId);
    } else if (dirn == 2) {
      // this is called when you delete
      var id = "";
      if ($scope.nextId > 0) id = $scope.nextId;
      else if ($scope.prevId > 0) id = $scope.prevId;
      NVR.debug("after delete, moving to " + id);
      prepareModalEvent(id);


    } else if (dirn == -1 && $scope.prevId > 0) {
      NVR.debug("Moving to:" + $scope.prevId);
      prepareModalEvent($scope.prevId);
    }




  }