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