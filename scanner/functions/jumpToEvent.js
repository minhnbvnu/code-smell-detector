function jumpToEvent(eid, dirn) {

    if (isSnapShotEnabled) {
      $scope.snapshotFrameId = NVR.getSnapshotFrame();
    } else {
      $scope.snapshotFrameId = 1;
    }

    $scope.isPaused = false;
    //isGlobalFid = false;
    var oState;
    NVR.log("HERE: Event jump called with:" + eid);
    if (eid == "") {
      $ionicLoading.show({
        template: $translate.instant('kNoMoreEvents'),
        noBackdrop: true,
        duration: 2000
      });

      return;
    }

    var slidein;
    var slideout;
    if (dirn == 1) {
      slideout = "animated slideOutLeft";
      slidein = "animated slideInRight";
    } else {
      slideout = "animated slideOutRight";
      slidein = "animated slideInLeft";
    }

    oState = currentStreamState;
    var element = angular.element(document.getElementById("full-screen-event"));
    element.addClass(slideout).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', outWithOld);

    function outWithOld() {

      NVR.log("ModalCtrl:Stopping network pull...");
      NVR.stopNetwork("EventModalCtrl-out with old");
      $scope.animationInProgress = true;
      // give digest time for image to swap
      // 100 should be enough
      $timeout(function () {
        element.removeClass(slideout);
        element.addClass(slidein)
          .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', inWithNew);
        processMove(eid, dirn);

        // FIXME: why does making this STOPPED show video playable error?
        currentStreamState = streamState.SNAPSHOT;
      }, 200);
    }

    function inWithNew() {
      element.removeClass(slidein);
      $scope.animationInProgress = false;
      carouselUtils.setStop(false);
      currentStreamState = oState;


    }

  }