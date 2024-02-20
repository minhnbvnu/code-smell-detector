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