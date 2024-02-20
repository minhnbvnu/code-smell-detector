function unlock(idVerified) {
    /*
    idVerified == true means no pin check needed
               == false means check PIN
    */

    NVR.debug("unlock called with check PIN=" + idVerified);
    if (idVerified || ($scope.pindata.pin == loginData.pinCode)) {
      NVR.debug("PIN code entered is correct, or there is no PIN set");
      $rootScope.rand = Math.floor((Math.random() * 100000) + 1);
      zmAutoLogin.stop(); //safety
      zmAutoLogin.start();

      // PIN is fine, or not set so lets login
      zmAutoLogin.doLogin("<button class='button button-clear' style='line-height: normal; min-height: 0; min-width: 0;color:#fff;' ng-click='$root.cancelAuth()'><i class='ion-close-circled'></i>&nbsp;" + $translate.instant('kAuthenticating') + "...</button>")
        .then(function (data) // success
          {
            NVR.debug("PortalLogin: auth success");


            // $state.go("login" ,{"wizard": false});
            //login was ok, so get API details
            NVR.getAPIversion()
              .then(function (data) {
                  NVR.log("Got API version: " + data);
                  $rootScope.apiVersion = data;
                  var ld = NVR.getLogin();
                  console.log (">>>>>>>> COMPARING "+data+" to "+zm.minAppVersion);
                  if (NVR.versionCompare(data, zm.minAppVersion) == -1 && data != "0.0.0") {

                    $rootScope.importantMessageHeader = $translate.instant('kImportant');
                    $rootScope.importantMessageSummary = $translate.instant('kVersionIncompatible', {currentVersion: data, minVersion: zm.minAppVersion});
                    $ionicHistory.nextViewOptions({
                      disableAnimate:true,
                      disableBack: true
                    });
                    $state.go('app.importantmessage');

                      return;
                  }

              

                  /*if (data == "0.0.0")
                  {

                      NVR.log("API getVersion succeeded but returned 0.0.0 " + JSON.stringify(data));
                      NVR.displayBanner('error', ['ZoneMinder authentication failed']);
                      $state.go("login",
                      {
                          "wizard": false
                      });
                      return;

                  }*/
                  // coming here means continue
                  // console.log (">>>>>>>>>>>>>>>>>>>>>>>>>NEVER");

                  NVR.getKeyConfigParams(1);
                  NVR.getTimeZone();
                  EventServer.init();

                  NVR.zmPrivacyProcessed()
                    .then(function (val) {
                    //  console.log(">>>>>>>>>>>>>>>>>>> PRIVACY PROCESSED:" + val);
                      if (!val) {
                        var alertPopup = $ionicPopup.alert({
                          title: $translate.instant('kNote'),
                          template: $translate.instant('kDataPrivacyZM'),
                          okText: $translate.instant('kButtonOk'),
                          cancelText: $translate.instant('kButtonCancel'),
                        });

                      }
                    });

                  // if push broadcast happens BEFORE this, then no 
                  // state change will occur here which is good

                  // if push happens AFTER this, then while going to
                  // lastState, it will interrupt and go to onTap
                  // (I HOPE...)
                
                    //console.log ("NOTIFICATION TAPPED INSIDE CHECK IS "+$rootScope.tappedNotification);
                    var statetoGo = $rootScope.lastState ? $rootScope.lastState : 'app.montage';
                    //  NVR.debug("logging state transition");

                    if (!processPush) {
                      alreadyTransitioned = true;

                      if ($rootScope.LoginData.isKiosk) {
                        NVR.log ('>>> You are in kiosk mode');
                        statetoGo = 'app.montage';
                        $rootScope.lastStateParam='';
      
                      }

                      NVR.debug("Transitioning state to: " +
                      statetoGo + " with param " + JSON.stringify($rootScope.lastStateParam));

                    

                    $state.go(statetoGo, $rootScope.lastStateParam);
                    return;
                    }
                    else {
                      NVR.debug ("Deferred handling of push:");
                      processPush = false;
                      var s = NVR.evaluateTappedNotification();
                      NVR.debug("tapped Notification evaluation:"+ JSON.stringify(s));
                      $ionicHistory.nextViewOptions({
                        disableAnimate:true,
                        disableBack: true
                      });
                      $state.go(s[0],s[1],s[2]);
                      return;
                    }
                   

               
                },
                function (error) { // API Error
                  NVR.log("API Error handler: going to login getAPI returned error: " + JSON.stringify(error));
                  //NVR.displayBanner('error', ['ZoneMinder authentication failed']);

                  NVR.debug("Doing the Aaron Hack after 1 sec....");
                  $timeout(function () {
                    tryLoggingSecondTimeHack()
                      .then(function success(s) {
                          NVR.log("2nd time login hack worked!, nothing to do");
                          NVR.getTimeZone();
                        },
                        function error(e) {

                          $ionicHistory.nextViewOptions({
                            disableAnimate:true,
                            disableBack: true
                          });

                          if ($rootScope.apiValid == true) {
                            $state.go("app.login", {
                              "wizard": false
                            });
                            return;
                          } else {
                            NVR.log ('Portal login:invalid api');
                            if (!$rootScope.userCancelledAuth)
                            $state.go("app.invalidapi");
                            return;
                          }

                        });

                    return;

                  }, 1000);

                });



          },
          // coming here means auth error
          // so go back to login
          function (error) {
            NVR.debug("PortalLogin: error authenticating " +
              JSON.stringify(error));
            if (!$rootScope.userCancelledAuth) {
              NVR.displayBanner('error', ['ZoneMinder authentication failed', 'Please check API settings']);
              $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
              });
              $state.go("app.login", {
                "wizard": false
              });
              return;
            } else {
              // if user cancelled auth I guess we go to login
              $rootScope.userCancelledAuth = false;
              $state.go("app.login", {
                "wizard": false
              });
              return;
            }
          });
    } else {
      $scope.pindata.status = "Invalid PIN";

      // wobble the input box on error
      var element = angular.element(document.getElementById("pin-box"));

      element.addClass("animated shake")
        .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
          function () {
            element.removeClass("animated shake");
          });
    }
  }