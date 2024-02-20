function wizardLogin(u,zmu,zmp) {

    var d = $q.defer();
    var loginAPI = u + '/api/host/login.json';
    NVR.debug ("Inside wizardLogin: will try "+loginAPI);

        $http({
            method: 'post',
            url: loginAPI,
            timeout: zm.httpTimeout,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            responseType: 'text',
            transformResponse: undefined,
            transformRequest: NVR.object_to_query_string,
            data: {
              user: zmu,
              pass: zmp
            }
          })
          //$http.get(loginAPI)
          .then(function (textsucc) {

              $ionicLoading.hide();

              var succ;
              try {

                succ = JSON.parse(textsucc.data);

                if (!succ.version) {
                  NVR.debug("API login returned fake success, going back to webscrape");
                 

                  loginWebScrape(u,zmu,zmp)
                    .then(function (succ) {
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
                NVR.debug("API based login returned... ");
                //  console.log (JSON.stringify(succ));
                $ionicLoading.hide();
                //$rootScope.loggedIntoZm = 1;
                $rootScope.authSession = '';
                if (succ.access_token) {
                  NVR.debug ('Got token, using it');
                  $rootScope.authSession = "&token=" + succ.access_token; 
                } else if (succ.credentials) {
                  NVR.debug ('Got auth= not token, using it');
                  $rootScope.authSession = "&" + succ.credentials;
                  if (succ.append_password == '1') {
                    $rootScope.authSession = $rootScope.authSession + loginData.password;
                  }
                }
              
                NVR.log("Stream authentication construction: " + $rootScope.authSession);
                NVR.log("zmAutologin successfully logged into Zoneminder via API");

                $scope.wizard.loginURL = $scope.wizard.fqportal;
                $scope.wizard.portalValidText = $translate.instant('kPortal') + ": " + $scope.wizard.loginURL;
                $scope.wizard.portalColor = "#16a085";
                d.resolve("Login Success");
                return d.promise;

              } catch (e) {
                NVR.debug("Login API approach did not work...");

                loginWebScrape(u,zmu,zmp)
                  .then(function (succ) {
                    $scope.wizard.loginURL = $scope.wizard.fqportal;
                    $scope.wizard.portalValidText = $translate.instant('kPortal') + ": " + $scope.wizard.loginURL;
                    $scope.wizard.portalColor = "#16a085";
                    d.resolve("Login Success");
                    return d.promise;
                  },
                    function (err) {
                      $ionicLoading.hide();
                      $scope.wizard.portalValidText = $translate.instant('kPortalDetectionFailed');
                      $scope.wizard.portalColor = "#e74c3c";
                      d.reject("Login Error");
                      return (d.promise);
                    });
                return d.promise;

              }
            },
            function (err) {
              NVR.debug("******************* API login error " + JSON.stringify(err));
              $ionicLoading.hide();

              if (1) {
                //if (err  && err.data && 'success' in err.data) {
                NVR.log("API based login not supported, need to use web scraping...");
                
                loginWebScrape(u,zmu,zmp)
                  .then(function (succ) {
                      d.resolve("Login Success");
                      return d.promise;
                    },
                    function (err) {
                      d.reject("Login Error");
                      return (d.promise);
                    });
              } else {
                // $rootScope.loggedIntoZm = -1;
                //console.log("**** ZM Login FAILED");
                NVR.log("zmAutologin Error via API: some meta foo", "error");
                $rootScope.$broadcast('auth-error', "I'm confused why");

                d.reject("Login Error");
                return (d.promise);
              }
            }
          ); // post
        return d.promise;
      }