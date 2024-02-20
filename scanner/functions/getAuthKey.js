function getAuthKey(mid, ck) {

        var d = $q.defer();

        if (!loginData.isUseAuth) {
          $rootScope.authSession = "";
          d.resolve($rootScope.authSession);
          return d.promise;
        }

        if ($rootScope.authSession != '' && $rootScope.authSession != 'undefined') {
          log("We already have an auth key of:" + $rootScope.authSession);
          d.resolve($rootScope.authSession);
          return d.promise;
        }

        if (loginData.currentServerVersion &&
          (versionCompare(loginData.currentServerVersion, zm.versionWithLoginAPI) != -1 || loginData.loginAPISupported)
        ) {

          const myurl = loginData.apiurl + '/host/login.json?username='+loginData.username+'&password='+loginData.password;
          debug("Server version " + loginData.currentServerVersion + " > 1.31.41, so using login API:" + myurl);
          $http.get(myurl)
            .then(function (s) {
                debug("Credentials API returned: " + JSON.stringify(s));
                if (!s.data || s.data.credentials == undefined) {
                  $rootScope.authSession = "";
                  d.resolve($rootScope.authSession);
                  debug("login() API Succeded, but did NOT return credentials key: " + JSON.stringify(s));
                  return d.promise;
                } else {
                  if (s.data.credentials != '') {
                    $rootScope.authSession = "&" + s.data.credentials;
                    if (s.data.append_password == '1') {
                      $rootScope.authSession = $rootScope.authSession +
                        loginData.password;
                    }
                  } else {
                    // incase auth is turned off, but user said
                    // its on.
                    $rootScope.authSession="&nonauth=none";
                    debug('Your auth seems to be turned off, but you said yes');
                  }

                  d.resolve($rootScope.authSession);
                  return d.promise;
                }
              },
              function (e) {
                //console.log ("***** CLEARING AUTHSESSION IN GETCREDENTIALS");
                $rootScope.authSession = "";
                d.resolve($rootScope.authSession);
                debug("AuthHash API Error: " + JSON.stringify(e));
                return d.promise;
              }
            );
          return d.promise;
        }
        //old way without login API

        var as = 'undefined';

        if (!mid && monitors && monitors.length > 0) {
          mid = monitors[0].Monitor.Id;
        }

        if (!mid) {
          log("Deferring auth key, as monitorId unknown");
          d.resolve("");
          $rootScope.authSession = as;
          return (d.promise);
        }

        // Skipping monitor number as I only need an auth key
        // so no need to generate an image
        myurl = loginData.url + "/index.php?view=watch&mid=" + mid;
        debug("NVR: Getting auth from " + myurl + " with mid=" + mid);
        $http.get(myurl)
          .then(function (success) {
              //console.log ("**** RESULT IS " + JSON.stringify(success));
              // Look for auth=
              var auth = success.data.match("auth=(.*?)&");
              if (auth && (auth[1] != null)) {
                log("NVR: Extracted a stream authentication key of: " + auth[1]);
                as = "&auth=" + auth[1];
                $rootScope.authSession = as;
                d.resolve(as);
              } else {
                log("NVR: Did not find a stream auth key, looking for user=");
                auth = success.data.match("user=(.*?)&");
                if (auth && (auth[1] != null)) {
                  log("NVR: Found simple stream auth mode (user=)");
                  as = "&user=" + loginData.username + "&pass=" + encodeURIComponent(loginData.password);
                  $rootScope.authSession = as;
                  d.resolve(as);
                } else {
                  log("Data Model: Did not find any  stream mode of auth");
                  as = "";
                  $rootScope.authSession = "";
                  d.resolve(as);
                  return d.promise;
                }
                return (d.promise);
              }
            },
            function (error) {
              log("NVR: Error resolving auth key " + JSON.stringify(error));
              d.resolve("");
              return (d.promise);
            });
        return (d.promise);
      }