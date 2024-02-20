function onOnline() {
        $timeout(function () {
          if ($rootScope.online == true) {
            NVR.log ("**** network online, but looks like it was not offline, not doing anything");
            return;
          }
          NVR.log("************ Your network came back online");

          $rootScope.online = true;
              var networkState = "browser not supported";
              if (navigator.connection) networkState = navigator.connection.type;
              NVR.debug("Detected network type as: " + networkState);
              var strState = NVR.getBandwidth();
              NVR.debug("getBandwidth() normalized it as: " + strState);
              $rootScope.runMode = strState;
              if ((NVR.getLogin().autoSwitchBandwidth == true) &&
                (NVR.getLogin().enableLowBandwidth == true)) {
                NVR.debug("Setting app state to: " + strState);
                $rootScope.$broadcast('bandwidth-change', strState);
              } else {
                NVR.debug("Not changing bandwidth state, as auto change is not on");
              }
              NVR.log("Your network is online, re-authenticating");
              zmAutoLogin.doLoginNoLogout($translate.instant('kReAuthenticating'));
        });
      }