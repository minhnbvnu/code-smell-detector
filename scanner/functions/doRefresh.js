function doRefresh() {
        NVR.flushAPICache()
        .then (function () {
          $scope.monitors = [];

        var refresh = NVR.getMonitors(1);

        refresh.then(function (data) {
          $scope.monitors = data;
          monitorStateCheck();
          $scope.$broadcast('scroll.refreshComplete');
        });
        });
        
      }