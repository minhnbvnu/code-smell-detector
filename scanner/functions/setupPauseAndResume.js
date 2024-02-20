function setupPauseAndResume() {
        NVR.log("Setting up pause and resume handler AFTER language is loaded...");

        if ($rootScope.platformOS != 'android') {
          document.addEventListener("resume", function () {
            resumeHandler();
          }, false);

          document.addEventListener("pause", function () {
            pauseHandler();
          }, false);
        } else {
          NVR.debug("Android detected, using cordova-multiwindow plugin for onStop/onStart instead");
          window.MultiWindowPlugin.registerOnStop("app-pause", pauseHandler);
          window.MultiWindowPlugin.registerOnStart("app-resume", resumeHandler);
        }

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

        function pauseHandler() {
          NVR.log ("-->Clearing online/offine");
          document.removeEventListener("offline", onOffline, false);
          document.removeEventListener("online", onOnline, false);
          window.removeEventListener("resize", checkOrientation, false);

          NVR.setBackground(true);
          NVR.setJustResumed(false);
          // NVR.setJustResumed(true); // used for window stop

          NVR.log("ROOT APP:App is going into background");
          EventServer.disconnect();

          $interval.cancel($rootScope.eventQueryInterval);
          $interval.cancel($rootScope.intervalHandle);
          zmAutoLogin.stop();

          var ld = NVR.getLogin();


          if ($rootScope.platformOS == "android") {
            NVR.log(" force exiting app since its android");
            navigator.app.exitApp();
            $timeout(function () {
              if (NVR.isBackground()) {
                NVR.log("If this shows up, then the app did not exit...");
                window.stop();
              } else {
                NVR.log("window stop delay timeout called as part of pause, but app no longer in background");
              }


            }, 5000);
          }

          if ($rootScope.zmPopup)
            $rootScope.zmPopup.close();
        }

      }