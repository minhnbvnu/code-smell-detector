function switchToServer(s) {

    $rootScope.alarmCount = 0;
    $rootScope.isAlarm = false;
    $rootScope.authSession = '';
    //console.log ("******************* AUTHSESSION RESET!!!!!!");



    // First lets kill current stuf
    NVR.debug("** Resetting existing server");
    var cld = NVR.getLogin();
    if (cld.isUseEventServer) {
      NVR.debug("Stopping Event server");
      EventServer.disconnect();
    }


    NVR.debug("**Switching to new server...");
    
    NVR.clearZmsMultiPortSupport();
    var zmServers = NVR.getServerGroups();
    var loginData = zmServers[s];
    NVR.debug("Retrieved state for this profile:" + JSON.stringify(loginData));
    NVR.checkInitSanity(loginData);
    NVR.setLogin(loginData);



    if (!loginData.isUseBasicAuth) {
      $rootScope.basicAuthHeader = '';
      $rootScope.basicAuthToken = '';
      // console.log ("CLEARING AUTH");
    } else {
      $rootScope.basicAuthToken = btoa(loginData.basicAuthUser + ':' + loginData.basicAuthPassword);
      $rootScope.basicAuthHeader = 'Basic ' + $rootScope.basicAuthToken;

    }


    if (window.cordova) {

      if (loginData.isUseBasicAuth) {
        NVR.debug("Cordova HTTP: configuring basic auth");
        cordova.plugin.http.useBasicAuth(loginData.basicAuthUser, loginData.basicAuthPassword);
      }

      if (!loginData.enableStrictSSL) {

        //alert("Enabling insecure SSL");
        NVR.log(">>>> Disabling strict SSL checking (turn off  in Dev Options if you can't connect)");
        cordova.plugin.http.setServerTrustMode('nocheck', function () {
          NVR.debug('--> SSL is permissive, will allow any certs. Use at your own risk.');
        }, function () {
          NVR.log('-->Error setting SSL permissive');
        });

        if ($rootScope.platformOS == 'android') {
          NVR.log (">>> Android: enabling inline image view for self signed certs");
          cordova.plugins.certificates.trustUnsecureCerts(true);
        }

      } else {

        NVR.log(">>>> Enabling strict SSL checking (turn off  in Dev Options if you can't connect)");

      }

    }


    if (loginData.isUseEventServer) {
      EventServer.init()
        .then(function (succ) {
            EventServer.sendMessage("control", {
              type: 'filter',
              monlist: loginData.eventServerMonitors,
              intlist: loginData.eventServerInterval,
              token: $rootScope.apnsToken
            });
          },
          function (err) {
            NVR.debug("EventServer init failed");
          });


    }


    

    //var portalurl = loginData.url + '/index.php';

    zmAutoLogin.doLogin("<button class='button button-clear' style='line-height: normal; min-height: 0; min-width: 0;  color:#fff;' ng-click='$root.cancelAuth()'><i class='ion-close-circled'></i>&nbsp;" + $translate.instant('kAuthenticating') + "...</button>")
      // Do the happy menu only if authentication works
      // if it does not work, there is an emitter for auth
      // fail in app.js that will be called to show an error
      // box

      .then(function (data) {
        zmAutoLogin.start();
        // possible image digits changed between servers
        NVR.getKeyConfigParams(0);
        NVR.getZMGroups();
        $rootScope.runMode = NVR.getBandwidth();
        //console.log ("HERE");
        var apiurl = loginData.apiurl + '/host/getVersion.json?'+$rootScope.authSession;

    //console.log ("****** MENU CONTROLLER:"+apiurl);

        NVR.log("Validating APIs at " + apiurl);
        $http.get(apiurl)
          .then(function (data) {

              data = data.data;
              NVR.getTimeZone(true);
              var loginStatus = $translate.instant('kExploreEnjoy') + " " + $rootScope.appName + "!";
              EventServer.refresh();

              // now grab and report PATH_ZMS
              NVR.getPathZms()
                .then(function (data) {
                  var ld = NVR.getLogin();
                  var zm_cgi = data.toLowerCase();

                  var user_cgi = (ld.streamingurl).toLowerCase();
                  NVR.log("ZM relative cgi-path: " + zm_cgi + ", you entered: " + user_cgi);

                  $http.get(ld.streamingurl + "/zms")
                    .then(function (data) {
                        data = data.data;
                        NVR.debug("Urk! cgi-path returned  success, but it should not have come here");
                        loginStatus = $translate.instant('kLoginStatusNoCgi');

                        NVR.debug("refreshing API version...");
                        NVR.getAPIversion()
                          .then(function (data) {
                              $rootScope.apiVersion = data;
                              var refresh = NVR.getMonitors(1)
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


                            },
                            function (error) {
                              var refresh = NVR.getMonitors(1)
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



                            });

                      },
                      function (error, status) {
                        // If its 5xx, then the cgi-bin path is valid
                        // if its 4xx then the cgi-bin path is not valid

                        if (status < 500) {
                          loginStatus = $translate.instant('kLoginStatusNoCgiAlt');
                        }

                        NVR.displayBanner((status < 500) ? 'error' : 'info', [loginStatus]);

                        NVR.debug("refreshing API version...");
                        NVR.getAPIversion()
                          .then(function (data) {
                              var refresh = NVR.getMonitors(1)
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

                            },
                            function (error) {
                              var refresh = NVR.getMonitors(1)
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

                            });

                      });
                });

            },
            function (error) {

              if ($rootScope.userCancelledAuth) {
                return;
              }
              NVR.displayBanner('error', [$translate.instant('kBannerAPICheckFailed'), $translate.instant('kBannerPleaseCheck')]);
              NVR.log("API login error " + JSON.stringify(error));

              $rootScope.zmPopup = SecuredPopups.show('alert', {
                title: $translate.instant('kLoginValidAPIFailedTitle'),
                template: $translate.instant('kBannerPleaseCheck'),
                okText: $translate.instant('kButtonOk'),
                cancelText: $translate.instant('kButtonCancel'),
              });
            });
      });


  }