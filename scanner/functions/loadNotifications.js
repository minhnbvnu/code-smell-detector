function loadNotifications() {

      if ($scope.iconTimeNow == 'local')
        $scope.timeNow = moment().format(NVR.getTimeFormatSec());
      else
        $scope.timeNow = moment().tz(NVR.getTimeZoneNow()).format(NVR.getTimeFormatSec());

      if (simulStreaming) {
         console.log ("Skipping timer as simulStreaming");
        return;
      }

      randEachTime();
      //console.log ($scope.randToAvoidCacheMem);

      if ($scope.areImagesLoading) {
        NVR.debug("skipping image refresh, packery is still loading");
        return;
      }

      //if (pckry && !$scope.isDragabillyOn) pckry.shiftLayout();
      $rootScope.rand = Math.floor((Math.random() * 100000) + 1);

      // if you see the time move, montage should move

      //$scope.timeNow = moment().format(NVR.getTimeFormatSec());

      //console.log ("Inside Montage timer...");
    }