function inWithNew() {
      element.removeClass(slidein);
      $scope.isModalStreamPaused = false;

      var ld = NVR.getLogin();
      carouselUtils.setStop(false);
      $scope.connKey = NVR.genConnKey();
      $scope.animationInProgress = false; // has to be AFTER new connkey
      NVR.log("<<<New image loaded in with ck:" + $scope.connKey);
    }