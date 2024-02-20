function resumeHandler() {
          NVR.setBackground(false);
          NVR.setJustResumed(true);
          $ionicPlatform.ready(function () {

            NVR.log("******* resumeHandler device ready");
            NVR.log("App is resuming from background");

            NVR.log ("-->Re-registering online/offine");
            document.addEventListener("offline", onOffline, false);
            document.addEventListener("online", onOnline, false);
            window.addEventListener("resize", checkOrientation, false);

            $rootScope.isDownloading = false;

            var ld = NVR.getLogin();
            // don't animate
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });

            // remember the last state so we can 
            // go back there after auth
            if ($ionicHistory.currentView()) {
              $rootScope.lastState = $ionicHistory.currentView().stateName;
              $rootScope.lastStateParam =
                $ionicHistory.currentView().stateParams;
              //NVR.debug("Last State recorded:" +
                //JSON.stringify($ionicHistory.currentView()));

              if ($rootScope.lastState == "app.zm-portal-login") {
                NVR.debug("Last state was portal-login, so forcing montage");
                $rootScope.lastState = "app.montage";
              }

              NVR.debug("going to portal login");
              $ionicHistory.nextViewOptions({
                disableAnimate: true
              });
              $state.go("app.zm-portal-login");
              return;
            } else {
              $rootScope.lastState = "";
              $rootScope.lastStateParam = "";
              NVR.debug("reset lastState to null");
              $ionicHistory.nextViewOptions({
                disableAnimate: true
              });
              $state.go("app.zm-portal-login");
              return;
            }
          });
        }