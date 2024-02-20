function monitorStateCheck() {
        
       // console.log ("Checking monitors");
        var ld = NVR.getLogin();
        // force get for latest status of monitors if av.
       NVR.getMonitors(1)
        .then (function (data) {
         
          $scope.monitors = data;

          if (!$scope.monitors.length) {
            $scope.monitorLoadStatus = $translate.instant ('kNoMonitors');
          } else {
            var mid;
            for (var i=0; i < $scope.monitors.length; i++) {
              mid = $scope.monitors[i].Monitor.Id;
              $scope.monitors[i].Monitor.forceMjpeg = (ld.monitorSpecific[mid] && ld.monitorSpecific[mid].forceMjpeg) ? true:false;
             // console.log ('********** Monitor :'+mid+" MJPEG="+$scope.monitors[i].Monitor.forceMjpeg );
            
            }
          }

          if (!$scope.monitors[0].Monitor_Status ) {
            NVR.debug ("no Monitor_Status found reverting to daemonCheck...");
            forceDaemonCheck();
          }
          else {
            NVR.debug ("reporting status of monitors from multi-server API");
            processMonitorStatus();
           
          }

        },
        function (err) {
          NVR.debug ("Monitor fetch error, reverting to daemonCheck...");
          $scope.monitorLoadStatus = $translate.instant ('kNoMonitors');
          forceDaemonCheck();
        });
        
      }