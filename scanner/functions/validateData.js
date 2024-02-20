function validateData() {
    //console.log ("***** CLEARING AUTHSESSION IN VALIDATEDATA");
    $rootScope.authSession = '';
    $rootScope.zmCookie = '';

    $scope.wizard.portalValidText = "";
    $scope.wizard.apiValidText = "";
    $scope.wizard.streamingValidText = "";
    $scope.wizard.fqportal = "";
    $scope.wizard.loginURL = "";
    $scope.wizard.apiURL = "";
    $scope.wizard.streamingURL = "";
    $scope.wizard.serverName = "";

    var d = $q.defer();
    var c = URI.parse($scope.wizard.portalurl);

    $scope.wizard.serverName = c.host;
    if (c.port) $scope.wizard.serverName += "-" + c.port;

    var b = "";
    if ($scope.wizard.useauth && $scope.wizard.usebasicauth) {
      // b = $scope.wizard.basicuser + ":" + $scope.wizard.basicpassword + "@";
      //console.log("B=" + b);
      $rootScope.basicAuthHeader = 'Basic ' + btoa($scope.wizard.basicuser + ':' + $scope.wizard.basicpassword);
      //console.log (">>>> WIZARD SET BASIC AUTH TO  " + $rootScope.basicAuthHeader);
    }
    var u = c.scheme + "://" + b + c.host;
    if (c.port) u += ":" + c.port;
    if (c.path) u += c.path;

    if (u.slice(-1) == '/') {
      u = u.slice(0, -1);
    }

    $scope.wizard.fqportal = u;

    //u = u + '/index.php?view=console';
    NVR.log("Wizard: login url is " + u);

    // now lets login

    var zmu = "x";
    var zmp = "x";
    if ($scope.wizard.usezmauth) {
      zmu = $scope.wizard.zmuser;
      zmp = $scope.wizard.zmpassword;
    }

    // logout first for the adventurers amongst us who must
    // use it even after logging in
    NVR.log("zmWizard: logging out");
    $ionicLoading.show({
      template: $translate.instant('kCleaningUp') + "...",
      noBackdrop: true,
      duration: zm.httpTimeout
    });
    logout(u)
      .then(function (ans) {
        // login now
        $ionicLoading.hide();
        NVR.log("zmWizard: logging in with " + u + " " + zmu);

        // The logic will be:
        // Login then do an api detect and cgi-detect together
        $ionicLoading.show({
          template: $translate.instant('kDiscoveringPortal') + "...",
          noBackdrop: true,
          duration: zm.httpTimeout
        });
        NVR.setCurrentServerVersion("");
        wizardLogin(u, zmu, zmp)
          .then(function (success) {
              $ionicLoading.hide();
              NVR.log("zmWizard: login succeeded");

              // API Detection
              $ionicLoading.show({
                template: $translate.instant('kDiscoveringAPI') + "...",
                noBackdrop: true,
                duration: zm.httpTimeout
              });
              detectapi()
                .then(function (success) {
                    $ionicLoading.hide();
                    NVR.log("zmWizard: API succeeded");

                    $ionicLoading.show({
                      template: $translate.instant('kDiscoveringCGI') + "...",
                      noBackdrop: true,
                      duration: zm.httpTimeout
                    });
                    // CGI detection
                    detectcgi()
                      .then(function (success) {
                          $ionicLoading.hide();
                          // return true here because we want to progress
                          d.resolve(true);
                          return d.promise;
                        },
                        function (error) {
                          $ionicLoading.hide();
                          // return true here because we want to progress
                          d.resolve(true);
                          return d.promise;
                        });
                  },
                  function (error) {
                    $ionicLoading.hide();
                    NVR.log("zmWizard: api failed");

                    // return true here because we want to progress
                    d.resolve(true);
                    return d.promise;
                  });

            },

            // if login failed, don't progress in the wizard
            function (error) {
              $ionicLoading.hide();
              NVR.log("zmWizard: login failed");
              $scope.wizard.portalValidText = $translate.instant('kPortalLoginUnsuccessful');
              $scope.wizard.portalColor = "#e74c3c";
              d.resolve(true);
              return d.promise;
            });

      }); //finally
    return d.promise;
  }