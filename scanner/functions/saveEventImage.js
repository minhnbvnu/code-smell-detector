function saveEventImage(onlyAlarms, eid) {

    if ($scope.isSnapShot()) {
      $scope.selectEventUrl = $scope.constructStream();
      NVR.debug("just saving current snapshot:" + $scope.selectEventUrl);
      saveEvent("image", eid);
    } else {
      selectFrameAndSave(onlyAlarms,eid);
    }
  }