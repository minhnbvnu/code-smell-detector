function saveDevOptions() {
    NVR.debug("SaveDevOptions: called");

    //console.log (JSON.stringify($scope.loginData));
    if (typeof $scope.loginData.zmNinjaCustomId !== 'undefined') {
      $scope.loginData.zmNinjaCustomId = $scope.loginData.zmNinjaCustomId.replace(/\s+/g, '_');

    }
    
    if (parseInt($scope.loginData.cycleMonitorsInterval) < zm.minCycleTime) {
      $scope.loginData.cycleMonitorsInterval = zm.minCycleTime.toString();
    }
    if ((parseInt($scope.loginData.maxFPS) < 0) || (parseInt($scope.loginData.maxFPS) > zm.maxFPS)) {
      $scope.loginData.maxFPS = zm.defaultFPS.toString();
    }

    if (parseInt($scope.loginData.refreshSec) <= 0) {
      NVR.debug("SaveDevOptions: refresh sec was too low at " +
        $scope.loginData.refreshSec + " reset to 1");
      $scope.loginData.refreshSec = 1;

    }

    // make sure only ints are used as CSS classes only use ints
    // in grid scale
    $scope.loginData.montageResizeSteps = parseFloat($scope.loginData.montageResizeSteps);

    if ($scope.loginData.montageResizeSteps < 0.05) {
      $scope.loginData.montageResizeSteps = 0.05;

    }

    if ($scope.loginData.montageResizeSteps > 50) {
      $scope.loginData.montageResizeSteps = 50;

    }

    if ((parseInt($scope.loginData.montageQuality) < zm.safeMontageLimit) ||
      (parseInt($scope.loginData.montageQuality) > 100)) {
      $scope.loginData.montageQuality = 100;
    }

    if ((parseInt($scope.loginData.singleImageQuality) < zm.safeImageQuality) ||
      (parseInt($scope.loginData.singleImageQuality) > 100)) {
      $scope.loginData.singleImageQuality = zm.safeImageQuality.toString();
    }


    NVR.debug("SaveDevOptions: Saving to disk");
    NVR.setLogin($scope.loginData);

    //console.log ($scope.loginData);
    NVR.getMonitors(1);

  }