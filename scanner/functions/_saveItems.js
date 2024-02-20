function _saveItems(showalert) {
    NVR.debug("Inside save Items");

    $rootScope.alarmCount = 0;
    $rootScope.isAlarm = false;

    NVR.setFirstUse(false);
    NVR.setCurrentServerVersion('');
    NVR.setCurrentServerMultiPortSupported(false);

    // used for menu display

    // lets so some basic sanitization of the data
    // I am already adding "/" so lets remove spurious ones
    // though webkit has no problems. Even so, this is to avoid
    // a deluge of folks who look at the error logs and say
    // the reason the login data is not working is because
    // the app is adding multiple "/" characters

    $scope.loginData.url = $scope.loginData.url.replace(/\s/g, "");
    $scope.loginData.apiurl = $scope.loginData.apiurl.replace(/\s/g, "");
    $scope.loginData.streamingurl = $scope.loginData.streamingurl.replace(/\s/g, "");
    $scope.loginData.eventServer = $scope.loginData.eventServer.replace(/\s/g, "");

    $scope.loginData.username = $scope.loginData.username.trim();

    while ($scope.loginData.url.slice(-1) == '/') {
      $scope.loginData.url = $scope.loginData.url.slice(0, -1);
    }

    while ($scope.loginData.apiurl.slice(-1) == '/') {
      $scope.loginData.apiurl = $scope.loginData.apiurl.slice(0, -1);
    }

    while ($scope.loginData.streamingurl.slice(-1) == '/') {
      $scope.loginData.streamingurl = $scope.loginData.streamingurl.slice(0, -1);
    }

    while ($scope.loginData.eventServer.slice(-1) == '/') {
      $scope.loginData.eventServer = $scope.loginData.eventServer.slice(0, -1);
    }
    // strip cgi-bin if it is there but only at the end
    // Nov 17 Don't mess with this path. centos uses zm-cgi-bin of all things

    /*if ($scope.loginData.streamingurl.slice(-7).toLowerCase() == 'cgi-bin') {
        $scope.loginData.streamingurl = $scope.loginData.streamingurl.slice(0, -7);
    }*/

    // check for protocol and if not put it in

    $scope.loginData.url = addhttp($scope.loginData.url);
    $scope.loginData.apiurl = addhttp($scope.loginData.apiurl);
    $scope.loginData.streamingurl = addhttp($scope.loginData.streamingurl);
    $scope.loginData.eventServer = addWsOrWss($scope.loginData.eventServer);

    /* if ($scope.loginData.useSSL) {
         // replace all http with https
         $scope.loginData.url = $scope.loginData.url.replace("http:", "https:");
         $scope.loginData.apiurl = $scope.loginData.apiurl.replace("http:", "https:");
         $scope.loginData.streamingurl = $scope.loginData.streamingurl.replace("http:", "https:");
         $scope.loginData.eventServer = $scope.loginData.eventServer.replace("ws:", "wss:");
     } else {
         // replace all https with http
         $scope.loginData.url = $scope.loginData.url.replace("https:", "http:");
         $scope.loginData.apiurl = $scope.loginData.apiurl.replace("https:", "http:");
         $scope.loginData.streamingurl = $scope.loginData.streamingurl.replace("https:", "http:");
         // don't do it for WSS - lets mandate that
     }*/

    var apiurl = $scope.loginData.apiurl + '/host/getVersion.json?'+$rootScope.authSession;
  
    // Check if isUseAuth is set make sure u/p have a dummy value
    if ($scope.loginData.isUseAuth) {
      if (!$scope.loginData.username) $scope.loginData.username = "x";
      if (!$scope.loginData.password) $scope.loginData.password = "x";
      //NVR.log("Authentication is disabled, setting dummy user & pass");
    }

    if (parseInt($scope.loginData.maxMontage) <= 0) {
      $scope.loginData.maxMontage = "100";
    }

    // do this before setLogin so message is sent

    if (!$scope.loginData.isUseEventServer) {
      $rootScope.isAlarm = 0;
      if ($rootScope.apnsToken) {
        NVR.log("Making sure we don't get push notifications");
        EventServer.sendMessage('push', {
          type: 'token',
          platform: $rootScope.platformOS,
          token: $rootScope.apnsToken,
          state: "disabled"
        }, 1);
      }
    }

    if (!$scope.loginData.isUseBasicAuth) {
      $rootScope.basicAuthHeader = '';
      $rootScope.basicAuthToken = '';
      // console.log ("CLEARING AUTH");
    } else {
      $rootScope.basicAuthToken = btoa($scope.loginData.basicAuthUser + ':' + $scope.loginData.basicAuthPassword);
      $rootScope.basicAuthHeader = 'Basic ' + $rootScope.basicAuthToken;
    }

    var ld = NVR.getLogin();
    if ((ld.username != $scope.loginData.username) || (ld.password != $scope.loginData.password)) {
      NVR.debug('User information has changed, removing access tokens, if any');
      $scope.loginData.accessToken = '';
      $scope.loginData.refreshToken = '';
      $scope.loginData.accessTokenExpires = '';
      $scope.loginData.refreshTokenExpires = '';
    }

    NVR.setLogin($scope.loginData);
    $rootScope.authSession = '';

    if ($rootScope.platformOS != 'desktop') {
      if ($scope.loginData.isUseBasicAuth) {
        NVR.debug("Cordova HTTP: configuring basic auth");
        cordova.plugin.http.useBasicAuth($scope.loginData.basicAuthUser, $scope.loginData.basicAuthPassword);
      }

      if (!$scope.loginData.enableStrictSSL) {
        //alert("Enabling insecure SSL");
        NVR.log(">>>> Disabling strict SSL checking (turn off in Dev Options if you can't connect)");
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
        NVR.log(">>>> Enabling strict SSL checking (turn off in Dev Options if you can't connect)");
      }

      if ($scope.loginData.saveToCloud) {
        NVR.debug("writing data to cloud");

        var serverGroupList = NVR.getServerGroups();
        serverGroupList[$scope.loginData.serverName] = angular.copy($scope.loginData);

        var ct = NVR.encrypt(serverGroupList);
        window.cordova.plugin.cloudsettings.save({
            'serverGroupList': ct,
            'defaultServerName': $scope.loginData.serverName
          },
          function () {
            NVR.debug("local data synced with cloud...");
          },
          function (err) {
            NVR.debug("error syncing cloud data..." + JSON.stringify(err));
          }, true);

      } else {
        NVR.debug("Clearing cloud settings...");
        window.cordova.plugin.cloudsettings.save({},
          function () {
            NVR.debug("cloud data cleared");
          },
          function (err) {
            NVR.debug("error clearing cloud data: " + err);
          }, true);
      }
    }

    $rootScope.runMode = NVR.getBandwidth();
    oldName = $scope.loginData.serverName;

    if ($scope.loginData.isUseEventServer) {
      EventServer.init()
        .then(function (succ) {
            if ($rootScope.apnsToken && $scope.loginData.disablePush != true) {
              NVR.log("Making sure we get push notifications");
              EventServer.sendMessage('push', {
                type: 'token',
                platform: $rootScope.platformOS,
                token: $rootScope.apnsToken,
                state: "enabled"
              }, 1);
            }
            EventServer.sendMessage("control", {
              type: 'filter',
              monlist: $scope.loginData.eventServerMonitors,
              intlist: $scope.loginData.eventServerInterval,
              token: $rootScope.apnsToken
            });
          },
          function (err) {
            NVR.log("Event server init failed");
          });
    }
    
    zmAutoLogin.doLogin("<button class='button button-clear' style='line-height: normal; min-height: 0; min-width: 0;  color:#fff;' ng-click='$root.cancelAuth()'><i class='ion-close-circled'></i>&nbsp;" + $translate.instant('kAuthenticating') + "...</button>")
      // Do the happy menu only if authentication works
      // if it does not work, there is an emitter for auth
      // fail in app.js that will be called to show an error
      // box

      .then(function (data) {
        // Now let's validate if the API works
        // note that due to reachability, it might have switched to another server

        if ($scope.loginData.serverName != NVR.getLogin().serverName) {
          NVR.debug(">>> Server information has changed, likely a fallback took over!");
          $scope.loginData = NVR.getLogin();
          portalurl = $scope.loginData.url + '/index.php';
        }

        // possible image digits changed between servers
        NVR.getKeyConfigParams(0);
        console.log('In loginCtrl, token is '+$rootScope.authSession);
        apiurl = $scope.loginData.apiurl + '/host/getVersion.json?'+$rootScope.authSession;
        
        NVR.log("Validating APIs at " + apiurl);
        $http.get(apiurl)
          .then(function (data) {
              data = data.data;
              NVR.getTimeZone(true);
              var loginStatus = $translate.instant('kExploreEnjoy') + " " + $rootScope.appName + "!";
              EventServer.refresh();

              NVR.debug("refreshing API version...");
              NVR.getAPIversion()
                .then(function (data) {
                    var refresh = NVR.getMonitors(1);
                    $rootScope.apiVersion = data;
                   // console.log ("ALERT="+showalert);
                    if (showalert) {
                      $rootScope.zmPopup = SecuredPopups.show('alert', {
                        title: $translate.instant('kLoginValidatedTitle'),
                        template: loginStatus,
                        okText: $translate.instant('kButtonOk'),
                        cancelText: $translate.instant('kButtonCancel'),
                      }).then(function (res) {
                        $ionicSideMenuDelegate.toggleLeft();
                        NVR.debug("Force reloading monitors...");
                      });
                    }
                  },
                  function (error) {
                    var refresh = NVR.getMonitors(1);
                    $rootScope.apiVersion = "0.0.0";
                    NVR.debug("Error, failed API version, setting to " + $rootScope.apiVersion);
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