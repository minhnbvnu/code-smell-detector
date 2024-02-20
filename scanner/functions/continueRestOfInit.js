function continueRestOfInit() {
        
        // use desktop state for mobile too as 
        // mobile now quits
        if ($rootScope.platformOS == 'desktop' || 1) {
          $rootScope.lastState = "";
          $rootScope.lastStateParam = {};

          localforage.getItem('last-desktop-state')
            .then(function (succ) {
             //console.log("FOUND  STATE" + JSON.stringify(succ) + ":" + succ);

             if (succ == null) succ = {name:"app.montage"};

              // sanitize this
              if (!succ.name || typeof succ.name !== 'string') {
                succ.name = "app.montage";
              }

              if (!succ.params) {
                succ.params = {};
              }
              if (succ) {
                if (succ.name == 'app.invalidapi' || succ.name == 'app.refresh' || succ.name == 'app.importantmessage' || succ.name == "app.first-use" || succ.name == "app.zm-portal-login" || !succ.name) {
                  succ.name = 'app.montage';
                  localforage.setItem('last-desktop-state', succ.name);
                }
                $rootScope.lastState = succ.name;
                if ($rootScope.lastState.indexOf("app.") == -1) {
                  $rootScope.lastState = "app." + $rootScope.lastState;
                }
                $rootScope.lastStateParam = succ.params;
                NVR.debug("last state=" + $rootScope.lastState + " param=" + $rootScope.lastStateParam);
              }
              loadServices();
            }, function (err) {
              
            //  console.log("ERR " + JSON.stringify(err));
              $rootScope.lastState = "app.montage";
              loadServices();
            });
        } 

        function loadServices() {
          NVR.log("Language file loaded, continuing with rest");
          NVR.init();
          zmCheckUpdates.start();
         // NVR.log("Setting up POST LOGIN timer");
          setupPauseAndResume();
        }
      }