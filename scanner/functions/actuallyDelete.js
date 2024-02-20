function actuallyDelete() {
          var zmServers = NVR.getServerGroups();
          //console.log ("YOU WANT TO DELETE " + $scope.loginData.serverName);
          //console.log ("LENGTH OF SERVERS IS " + Object.keys(zmServers).length);
          if (Object.keys(zmServers).length > 1) {
            NVR.log("Deleting " + $scope.loginData.serverName);
            delete zmServers[$scope.loginData.serverName];
            NVR.setServerGroups(zmServers);
            // point to first element
            // better than nothing
            // note this is actually unordered
            $scope.loginData = zmServers[Object.keys(zmServers)[0]];
            NVR.setLogin($scope.loginData);

            availableServers = Object.keys(NVR.getServerGroups());
            serverbuttons = [{
              text: $translate.instant('kServerAdd') + "..."
            }];
            for (var servIter = 0; servIter < availableServers.length; servIter++) {
              serverbuttons.push({
                text: availableServers[servIter]
              });
            }
          } else {
            NVR.displayBanner('error', [$translate.instant('kBannerCannotDeleteNeedOne')]);
          }
        }