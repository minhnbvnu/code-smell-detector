function detectcgi() {
    var d = $q.defer();
    var c = URI.parse($scope.wizard.loginURL);
    var p1, p2;
    p1 = "";
    p2 = "";

    if (c.userinfo)
      p1 = c.userinfo + "@";
    if (c.port)
      p2 = ":" + c.port;

    var baseUri = c.scheme + "://" + p1 + c.host + p2;

    NVR.log("zmWizard CGI: baseURL is " + baseUri);

    var a5 = baseUri + "/zmcgi"; // mageia
    var a4 = baseUri + "/cgi-bin/zm"; // another one I found with a CentOS 6 guy
    var a1 = baseUri + "/zm/cgi-bin"; // ubuntu/debian
    var a2 = baseUri + "/cgi-bin-zm"; //fedora/centos/rhel
    var a3 = baseUri + "/cgi-bin"; // doofus

    var urls = [a1, a2, a3, a4, a5];

    // can't use getPathZms as loginData is not inited yet
    $http.get($scope.wizard.apiURL + "/configs/viewByName/ZM_PATH_ZMS.json?"+$rootScope.authSession)
      //NVR.getPathZms() // what does ZM have stored in PATH_ZMS?
      .then(function (data) {
          // remove zms or nph-zms
          var str = data.data.config.Value;
          var path = str.trim();
          path = path.replace("/nph-zms", "");
          path = path.replace("/zms", "");
          urls.push(baseUri.trim() + path);
          NVR.log("zmWizard: getPathZMS succeeded, adding " + baseUri + path + " to things to try");
          continueCgi(urls);
        },
        function (error) {
          NVR.log("zmWizard: getPathZMS failed, but continuing...");
          continueCgi(urls);
        });

    // Well, PATH_ZMS or not, lets call this function and brute force it
    function continueCgi(urls) {
      $ionicLoading.show({
        template: $translate.instant('kDiscovering') + "...",
        noBackdrop: true,
        duration: zm.httpTimeout
      });
      getFirstMonitor()
        .then(function (success) {
            $ionicLoading.hide();
            var tail = "/nph-zms?mode=single&monitor=" + success;//+ $rootScope.authSession;
            if ($scope.wizard.useauth && $scope.wizard.usezmauth) {

              var ck = Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
              NVR.getAuthKey(success, ck)
                .then(function (success) {
                    if (success == "") {
                      NVR.log("getAuthKey returned null, so going user=&pwd= way");
                      tail += "&user=" + $scope.wizard.zmuser + "&pass=" + encodeURIComponent($scope.wizard.zmpassword);
                    } else {
                      tail += success;
                    }
                    NVR.log("auth computed is : " + tail);
                    proceedwithCgiAfterAuth(urls, tail);
                  },
                  function (error) {
                    NVR.log("Should never come here, getAuthKey doesn't return error");
                  });

              //console.log ("****CDING " + tail);
            } else // no auth case
            {
              proceedwithCgiAfterAuth(urls, tail);
            }

            function proceedwithCgiAfterAuth(urls, tail) {

              $ionicLoading.show({
                template: $translate.instant('kDiscovering') + "...",
                noBackdrop: true,
                duration: zm.httpTimeout
              });

              findFirstReachableUrl(urls, tail)
                .then(function (success) {
                    $ionicLoading.hide();
                    NVR.log("Valid cgi-bin found with: " + success);
                    $scope.wizard.streamingURL = success;
                    $scope.wizard.streamingValidText = "cgi-bin: " + $scope.wizard.streamingURL;
                    $scope.wizard.streamingColor = "#16a085";
                    d.resolve(true);
                    return d.promise;
                  },
                  function (error) {
                    $ionicLoading.hide();
                    NVR.debug("No cgi-bin found: " + JSON.stringify(error));
                    $scope.wizard.streamingValidText = $translate.instant('kPortalCgiBinFailed');
                    $scope.wizard.streamingColor = "#e74c3c";
                    d.reject(false);
                    return (d.promise);
                  });
            }
          },
          function (error) {
            $ionicLoading.hide();
            $scope.wizard.streamingValidText = $translate.instant('kPortalCgiBinFailed') + " -" + $translate.instant('kPortalNoMonitorFound');
            $scope.wizard.streamingColor = "#e74c3c";
            d.reject(false);
            return (d.promise);

          });
    }
    return d.promise;
  }