function switchMontageProfile(mName) {
      $interval.cancel(intervalHandleMontageCycle);
      intervalHandleMontageCycle = $interval(function () {
        cycleMontageProfiles();
        //  console.log ("Refreshing Image...");
      }.bind(this), NVR.getLogin().cycleMontageInterval * 1000);

      var ld = NVR.getLogin();
      ld.packeryPositions = ld.packeryPositionsArray[mName];
      ld.currentMontageProfile = mName;
      $scope.currentProfileName = mName || $translate.instant('kMontage');
      console.log("NEW POS="+ld.packeryPositions);
      var positionsStr = ld.packeryPositions;
      var positions;

      if (positionsStr == '' || positionsStr == undefined) {
        NVR.debug('No positions stored');
        positions = undefined;
        positionsStr = undefined;
      } else {
        positions = parsePositions(positionsStr);
        matchMonitorsToPositions(positions);
      }

      NVR.setLogin(ld).then(function(data) {
        if (!ld.packeryPositions) {
          NVR.debug("This profile doesn't seem to have been saved. Resetting it to defaults...");
          //$scope.resetSizes(true);
        }
      });

      $timeout(function () { // after render
        if (simulStreaming) {
          currentStreamState = streamState.STOPPED;
          NVR.debug("Killing all streams in montage to save memory/nw...");

          if ($rootScope.platformOS == 'ios') {
            NVR.stopNetwork();
          } else {
            for (var i = 0; i < $scope.MontageMonitors.length; i++) {
              var monitor = $scope.MontageMonitors[i].Monitor;
              if (monitor.listDisplay == 'show')
                NVR.killLiveStream(monitor.connKey, monitor.controlURL, monitor.Name);
            }
          }

          // in timeout for iOS as we call stopNetwork
          $timeout(function () {
            //console.log ("SIMUL SWITCH MONTAGE CALLING REGEN");
            NVR.regenConnKeys();
            $scope.monitors = NVR.getMonitorsNow();
            var ps = NVR.getLogin().packeryPositions;

            var p = parsePositions(ps);
            matchMonitorsToPositions(p, $scope.monitors);
            $scope.MontageMonitors = angular.copy($scope.monitors);

            // console.log("BEFORE INIT PACKERY"+JSON.stringify(positions));
            /*
            for (var x=0; x < $scope.MontageMonitors.length; x++) {

              console.log ('BEFORE INITPACKERY: '+$scope.MontageMonitors[x].Monitor.Id+'==>'+$scope.MontageMonitors[x].Monitor.listDisplay);
            }*/
            //var pl = positions? positions.length : 0;

            /*
            for (var x=0; x < $scope.MontageMonitors.length; x++) {
              for (var xx = 0; xx < pl; xx++) {


                if ($scope.MontageMonitors[x].Monitor.Id == positions[xx].attr && $scope.MontageMonitors[x].Monitor.Function=='None' && positions[xx].display=='show') {
                  console.log ('BEFORE: Making MID='+$scope.MontageMonitors[x].Monitor.Id+' to blank');
                  $scope.MontageMonitors[x].Monitor.listDisplay='blank';
                  positions[xx].attr = 'blank';
                }
              }
              console.log ('BEFORE: '+$scope.MontageMonitors[x].Monitor.Id+'==>'+$scope.MontageMonitors[x].Monitor.listDisplay);
            } */

            $timeout(function () {
              var ps = NVR.getLogin().packeryPositions;
              var p = parsePositions(ps);
              matchMonitorsToPositions(p);
              initPackery();
            }, zm.packeryTimer);
          });

        } else {
          //console.log ("NOT SIMUL SWITCH MONTAGE CALLING REGEN");
          NVR.regenConnKeys();

          $scope.monitors = NVR.getMonitorsNow();
          var ps = NVR.getLogin().packeryPositions;
          var p = parsePositions(ps);
          matchMonitorsToPositions(p, $scope.monitors);
          $scope.MontageMonitors = angular.copy($scope.monitors);

          /*
          var pl = positions? positions.length : 0;
          for (var x=0; x < $scope.MontageMonitors.length; x++) {
            for (var xx = 0; xx < pl; xx++) {
              if ($scope.MontageMonitors[x].Monitor.Id == positions[xx].attr && !$scope.MontageMonitors[x].Monitor.Function=='None' && positions[xx].display=='show') {
                console.log ('BEFORE: Making MID='+$scope.MontageMonitors[x].Monitor.Id+' to blank');
                $scope.MontageMonitors[x].Monitor.listDisplay='blank';
              }
            }
            console.log ('BEFORE: '+$scope.MontageMonitors[x].Monitor.Id+'==>'+$scope.MontageMonitors[x].Monitor.listDisplay);
          }*/

          $timeout(function () {
            var ps = NVR.getLogin().packeryPositions;
            var p = parsePositions(ps);
            matchMonitorsToPositions(p);
            initPackery();
          }, zm.packeryTimer);
        }
      });
    }