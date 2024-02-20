function tryLoggingSecondTimeHack() {
    var d = $q.defer();

    zmAutoLogin.doLogin("<button class='button button-clear' style='line-height: normal; min-height: 0; min-width: 0;color:#fff;' ng-click='$root.cancelAuth()'><i class='ion-close-circled'></i>&nbsp;" + $translate.instant('kAuthenticating') + "...</button>")
      .then(function (data) // success
        {
          NVR.debug("2nd auth login worked");
          NVR.getAPIversion()
            .then(function (data) {
                NVR.getKeyConfigParams(1);
                NVR.log("2nd auth:Got API version: " + data);
                $rootScope.apiVersion = data;
                var ld = NVR.getLogin();
                if (NVR.versionCompare(data, zm.minAppVersion) == -1 && data != "0.0.0") {

                  $rootScope.importantMessageHeader = $translate.instant('kImportant');
                  $rootScope.importantMessageSummary = $translate.instant('kVersionIncompatible', {currentVersion: data, minVersion: zm.minAppVersion});


                  $state.go('app.importantmessage');
                  return;
                }

           

                var statetoGo = $rootScope.lastState ? $rootScope.lastState : 'app.montage';
                if ($rootScope.LoginData.isKiosk) {
                  NVR.log ('>>> You are in kiosk mode');
                  statetoGo = 'app.montage';
                  $rootScope.lastStateParam='';

                }
                //NVR.debug ("logging state transition");
                NVR.debug("2nd Auth: Transitioning state to: " +
                  statetoGo + " with param " + JSON.stringify($rootScope.lastStateParam));

                alreadyTransitioned = true;
                $state.go(statetoGo, $rootScope.lastStateParam);
                return;

              },
              function (error) {
                NVR.debug("2nd auth API failed, going to login");
                d.reject("failed 2nd auth");
                return (d.promise);

              });

        },
        function (error) {
          NVR.debug("2nd auth hack failed, going to login");
          d.reject("failed 2nd auth");
          return (d.promise);
        });

    return (d.promise);
  }