function continueInitialInit() {
        //  console.log("continueinit");
        var pixelRatio = window.devicePixelRatio || 1;
        $rootScope.pixelRatio = pixelRatio;
        $rootScope.devWidth = ((window.innerWidth > 0) ? window.innerWidth : screen.width);
        $rootScope.devHeight = ((window.innerHeight > 0) ? window.innerHeight : screen.height);
        // for making sure we canuse $state.go with ng-click
        // needed for views that use popovers
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        if (window.cordova) {
          
          //window.cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          //  console.log("statusbar");
          NVR.log("Updating statusbar");
          StatusBar.styleDefault();
         

          StatusBar.backgroundColorByHexString("#2980b9");
        }

        if (window.cordova) {
          // console.log("Hiding splash");
          $cordovaSplashscreen.hide();



          // console.log("app version");
          cordova.getAppVersion.getVersionNumber().then(function (version) {
          
            NVR.log("App Version: " + version);
            NVR.setAppVersion(version);
          });
        }
        else {
         // custom header
         $rootScope.appVersion = NVR.getAppVersion();
        }
      


        // At this stage, NVR.init is not called yet
        // but I do need to know the language

        NVR.log("Retrieving language before init is called...");
        localforage.getItem("defaultLang")
          .then(function (val) {

            var lang = val;
            //console.log (">>>>>>>>>>>>>> LANG IS " + val);

            if (lang == undefined || lang == null) {
              NVR.log("No language set, switching to en");
              lang = "en";

            } else {
              NVR.log("Language stored as:" + lang);

            }

            NVR.setDefaultLanguage(lang, false)
              .then(function (success) {
                NVR.log(">>>>Language to be used:" + $translate.proposedLanguage());
                moment.locale($translate.proposedLanguage());

                // Remember this is before data Init
                // so I need to do a direct forage fetch
                localforage.getItem("isFirstUse")
                  .then(function (val) {
                    //console.log ("isFirstUse is " + val);
                    NVR.debug("isFirstUse returned: " + val);
                    if (val == null || val == true) {
                      NVR.log("First time detected ");
                      $rootScope.initComplete = true;
                      $state.go("app.first-use");
                      return;

                    } else {
                      continueRestOfInit();
                    }

                  });

              });
          });
      }