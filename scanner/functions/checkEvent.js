function checkEvent() {

    if (currentStreamState == streamState.SNAPSHOT) return;

    if ($scope.modalFromTimelineIsOpen == false) {
      NVR.log("Modal was closed in timeline, cancelling timer");
      $interval.cancel(eventQueryHandle);
      return;
    }

    //console.log ("Event timer");
    //console.log ("Event timer");

    if ($scope.defaultVideo !== undefined && $scope.defaultVideo != '') {
      //console.log("playing video, not using zms, skipping event commands");
    } else {
      processEvent('99', $scope.connKey)
        .then(function (succ) {
            $scope.checkEventOn = true;
          },
          function (err) {
            //$scope.checkEventOn = true; // umm are we sure?

          });
    }
  }