function logout(u) {
    var d = $q.defer();
    NVR.debug ("Clearing cookies");
    if (window.cordova) {
      // we need to do this or ZM will send same auth hash
      // this was fixed in a PR dated Oct 18
     
      cordova.plugin.http.clearCookies();
      if ($scope.wizard.useauth && $scope.wizard.usebasicauth) {
        NVR.debug ("setting basic auth with "+$scope.wizard.basicuser+":"+$scope.wizard.basicpassword);
        cordova.plugin.http.useBasicAuth($scope.wizard.basicuser, $scope.wizard.basicpassword);
      }
    } else {
      angular.forEach($cookies, function (v, k) {
        $cookies.remove(k);
      });
    }

    $http({
        method: 'POST',
        url: u,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        transformRequest: NVR.object_to_query_string,
        data: {
          action: "logout",
          view: "login"
        }
      })
      .then(function (success) {
        $rootScope.zmCookie = "";
        //console.log("ZMlogout success, cookie removed");
        d.resolve(true);
        return d.promise;
      }, function (error) {
        //console.log("ZMlogout success");
        d.resolve(true);
        return d.promise;
      });

    return d.promise;
  }