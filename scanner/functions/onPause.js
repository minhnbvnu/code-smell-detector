function onPause() {
    NVR.debug("TimelineCtrl:onpause called");
    $interval.cancel(updateInterval);
    // console.log("*** Moving to Background ***"); // Handle the pause event

    if ($scope.popover) $scope.popover.remove();

  }