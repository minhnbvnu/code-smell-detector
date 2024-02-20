function doPackery() {
          // $ionicLoading.hide();
          //console.log("REDOING PACKERY & DRAG");
          NVR.debug("Re-creating packery and draggy");

          // remove current draggies
          if (draggies)
            draggies.forEach(function (drag) {
              drag.destroy();
            });
          draggies = [];
          // destroy existing packery object
          if (pckry) pckry.destroy();
          initPackery();

          $interval.cancel($rootScope.eventQueryInterval);
          $rootScope.eventQueryInterval = $interval(function () {
            checkAllEvents();
          }.bind(this), zm.eventHistoryTimer);

        }