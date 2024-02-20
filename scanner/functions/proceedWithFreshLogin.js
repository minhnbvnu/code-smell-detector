function proceedWithFreshLogin(noBroadcast) {
        // recompute rand anyway so even if you don't have auth
        // your stream should not get frozen
        $rootScope.rand = Math.floor((Math.random() * 100000) + 1);
        $rootScope.modalRand = Math.floor((Math.random() * 100000) + 1);

        // console.log ("***** STATENAME IS " + statename);

        var d = $q.defer();
        log("Doing fresh login to ZM");
        var httpDelay = loginData.enableSlowLoading ? zm.largeHttpTimeout : zm.httpTimeout;

        str = "<a style='color:white; text-decoration:none' href='#' ng-click='$root.cancelAuth()' <i class='ion-close-circled'></i>&nbsp;" + $translate.instant('kAuthenticating')+"</a>";
        $ionicLoading.show({
          template: str,
          noBackdrop: true,
          duration: httpDelay
        });

        //first login using new API
        $rootScope.authSession = '';
        var loginAPI = loginData.apiurl + '/host/login.json';

        $http({
            method: 'post',
            url: loginAPI,
            timeout: httpDelay,
            skipIntercept: true,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'text',
            transformResponse: undefined,
            transformRequest: function (obj) {
              var str = [];
              for (var p in obj)
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
              return str.join("&");
            },
            data: {
              user: loginData.username,
              pass: loginData.password
            }
          })
          //$http.get(loginAPI)
          .then(function (textsucc) {

              $ionicLoading.hide();
              var succ;
              try {
                succ = JSON.parse(textsucc.data);

                if (!succ.version) {
                  debug("API login returned fake success, going back to webscrape");

                  loginData.loginAPISupported = false;
                  setLogin(loginData);

                  loginWebScrape()
                    .then(function () {
                        d.resolve("Login Success");
                        return d.promise;
                      },
                      function () {
                        $ionicLoading.hide();
                        d.reject("Login Error");
                        return (d.promise);
                      });
                  return d.promise;
                }
                debug("API based login returned. ");
                console.log(JSON.stringify(succ));
                setCurrentServerVersion(succ.version);
                $ionicLoading.hide();
                //$rootScope.loggedIntoZm = 1;
                //console.log ("***** CLEARING AUTHSESSION IN LINE 466");
                $rootScope.authSession = '';

                if (succ.refresh_token) {
                  $rootScope.authSession = '&token='+succ.access_token;
                  log ("New refresh token retrieved: ..."+succ.refresh_token.substr(-5));
                  loginData.isTokenSupported = true;

                  loginData.accessToken = succ.access_token;
                  loginData.accessTokenExpires = moment.utc().add(succ.access_token_expires, 'seconds');
                  loginData.refreshToken = succ.refresh_token;
                  $rootScope.tokenExpires = succ.access_token_expires;

                  log ('----> Setting token re-login after '+succ.access_token_expires+' seconds');
                  if (tokenExpiryTimer) $timeout.cancel(tokenExpiryTimer);
                  //succ.access_token_expires = 30;
                  tokenExpiryTimer = $timeout ( function () {
                    $rootScope.$broadcast('token-expiry');
                  }, succ.access_token_expires * 1000);

                  loginData.refreshTokenExpires = moment.utc().add(succ.refresh_token_expires, 'seconds');

                  log("Current time is: UTC "+moment.utc().format("YYYY-MM-DD hh:mm:ss"));
                  log("New refresh token expires on: UTC "+loginData.refreshTokenExpires.format("YYYY-MM-DD hh:mm:ss"));
                  log("New access token expires on: UTC "+loginData.accessTokenExpires.format("YYYY-MM-DD hh:mm:ss"));
                  setLogin(loginData);
                } else {
                  if (succ.credentials != undefined) {
                    if (succ.credentials != '') {
                      log("Could not recover token details, trying old auth credentials");
                      loginData.isTokenSupported = false;
                      setLogin(loginData);
                      $rootScope.authSession = "&" + succ.credentials;
                      if (succ.append_password == '1') {
                        $rootScope.authSession = $rootScope.authSession +
                          loginData.password;
                      }
                    } else {
                      // incase auth is turned off, but user said its on.
                      $rootScope.authSession="&nonauth=none";
                      debug('Your auth seems to be turned off, but you said yes');
                    }
                  } else {
                    log("Neither token nor old cred worked. Seems like an error");
                  }
                }  // end if succ.refresh_token

                loginData.loginAPISupported = true;
                setLogin(loginData);

                log("Stream authentication construction: " +
                  $rootScope.authSession);

                log("Successfully logged into Zoneminder via API");

                d.resolve("Login Success");
                if (!noBroadcast) $rootScope.$broadcast('auth-success', succ);
                return d.promise;
              } catch (e) {
                debug("Login API approach did not work...");
                loginData.loginAPISupported = false;
                loginData.isTokenSupported = false;
                setLogin(loginData);
                loginWebScrape()
                  .then(function () {
                      d.resolve("Login Success");
                      return d.promise;
                    },
                    function (err) {
                      $ionicLoading.hide();
                      d.reject("Login Error");
                      return (d.promise);
                    });
                return d.promise;
              }
            },
            function (err) {
              //console.log("******************* API login error " + JSON.stringify(err));
              $ionicLoading.hide();
              //if (err  && err.data && 'success' in err.data) {
              log("API based login not supported, need to use web scraping...");
              // login using old web scraping

              loginData.loginAPISupported = false;
              setLogin(loginData);
               loginWebScrape()
                .then(function () {
                    d.resolve("Login Success");
                    return d.promise;
                  },
                  function (err) {
                    d.reject("Login Error");
                    return (d.promise);
                  });
            }
          ); // post .then

        return d.promise;
      }