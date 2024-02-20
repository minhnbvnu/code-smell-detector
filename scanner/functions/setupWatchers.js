function setupWatchers() {
      NVR.debug("Setting up carousel watchers");

      ionRangeWatcher = $scope.$watch('ionRange.index', function () {
        // console.log ("Watching index");
        $scope.mycarousel.index = parseInt($scope.ionRange.index) - 1;
        if (carouselUtils.getStop() == true)
          return;

        //console.log ("***ION RANGE CHANGED TO " + $scope.mycarousel.index);
      });

      mycarouselWatcher = $scope.$watch('mycarousel.index', function () {

        if ($scope.event && $scope.ionRange.index == parseInt($scope.event.Event.Frames) - 1) {
          if (!$scope.modal || $scope.modal.isShown() == false) {
            // console.log("quick scrub playback over");
            carouselUtils.setStop(true);
            $scope.ionRange.index = 0;
            $scope.mycarousel.index = 1;
          }

        }
        if (carouselUtils.getStop() == true)
          return;
        $scope.ionRange.index = ($scope.mycarousel.index + 1).toString();
        // console.log ("***IONRANGE RANGE CHANGED TO " + $scope.ionRange.index);

      });

    }