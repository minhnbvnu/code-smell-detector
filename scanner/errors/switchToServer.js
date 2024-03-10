                                .then(function () {


                                  $ionicHistory.nextViewOptions({
                                    disableBack: true
                                  });

                                  //console.log("+++ state go after getMonitors force");
                                  $state.go('app.refresh', {
                                    "view": $state.current.name
                                  });
                                  return;
                                });
                                .then(function () {
                                  //console.log("+++ state go after API version error: " + error);
                                  $rootScope.apiVersion = "0.0.0";
                                  NVR.debug("Error, failed API version, setting to " + $rootScope.apiVersion);

                                  $ionicHistory.nextViewOptions({
                                    disableBack: true
                                  });


                                  $state.go('app.refresh', {
                                    "view": $state.current.name
                                  });
                                  return;

                                });
                                .then(function () {
                                  $rootScope.apiVersion = data;
                                  $ionicHistory.nextViewOptions({
                                    disableBack: true
                                  });

                                  //console.log("+++ state go after 5xx");
                                  $state.go('app.refresh', {
                                    "view": $state.current.name
                                  });
                                  return;
                                });
                                .then(function () {
                                  $rootScope.apiVersion = "0.0.0";
                                  NVR.debug("Error, failed API version, setting to " + $rootScope.apiVersion);
                                  $ionicHistory.nextViewOptions({
                                    disableBack: true
                                  });
                                  //console.log("+++ state go after API version force");
                                  $state.go('app.refresh', {
                                    "view": $state.current.name
                                  });
                                  return;

                                });