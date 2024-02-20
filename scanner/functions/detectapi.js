function detectapi() {
    var u = $scope.wizard.loginURL;
    var d = $q.defer();
    var api1 = u + "/api";
    var api3 = u + "/zm/api";
    var c = URI.parse(u);

    // lets also try without the path
    var api2 = c.scheme + "://";
    if (c.userinfo) api2 += c.userinfo + "@";
    api2 += c.host;
    if (c.port) api2 += ":" + c.port;
    api2 += "/api";

    // lets try both /zm/api and /api. What else is there?
    var apilist = [api1, api2, api3];

    findFirstReachableUrl(apilist, '/host/getVersion.json?'+$rootScope.authSession)
      .then(function (success) {
          NVR.log("Valid API response found with:" + success);
          $scope.wizard.apiURL = success;

          $scope.wizard.apiValidText = "API: " + $scope.wizard.apiURL;
          $scope.wizard.apiColor = "#16a085";
          d.resolve(true);
          return d.promise;
        },
        function (error) {
          //console.log("No APIs found: " + error);
          $scope.wizard.apiValidText = $translate.instant('kPortalAPIFailed');
          $scope.wizard.apiColor = "#e74c3c";
          d.reject(false);
          return (d.promise);
        });

    return d.promise;
  }