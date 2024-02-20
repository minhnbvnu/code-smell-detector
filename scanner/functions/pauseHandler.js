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