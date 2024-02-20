function login(url, zmusername, zmpassword) {
    var d = $q.defer();
    $http({
        method: 'post',
        //withCredentials: true,
        url: url,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        transformRequest: NVR.object_to_query_string,
        data: {
          username: zmusername,
          password: zmpassword,
          action: "login",
          view: "console"
        }
      })
      .then(function (data, status, headers) {
          data = data.data;
          console.log("LOOKING FOR " + zm.loginScreenString);
          console.log("DATA RECEIVED " + JSON.stringify(data));
          if (data.indexOf(zm.loginScreenString1) == -1 && 
              data.indexOf(zm.loginScreenString2) == -1 ) {

            $scope.wizard.loginURL = $scope.wizard.fqportal;
            $scope.wizard.portalValidText = $translate.instant('kPortal') + ": " + $scope.wizard.loginURL;
            $scope.wizard.portalColor = "#16a085";
            d.resolve(true);
            return d.promise;
          } else {
            //console.log("************ERROR");
            $scope.wizard.portalValidText = $translate.instant('kPortalDetectionFailed');
            $scope.wizard.portalColor = "#e74c3c";
           // NVR.debug("Login response form was invalid,I am going to try JSON login");

            d.reject(false);
            return d.promise;
          }
        },
        function (error) {
          // console.log("************ERROR:"+ JSON.stringify(error));
          NVR.debug ("Login error returned: "+JSON.stringify(error));
          $scope.wizard.portalValidText = $translate.instant('kPortalDetectionFailed');
          $scope.wizard.portalColor = "#e74c3c";
          d.reject(false);
          return d.promise;

        });
    return d.promise;
  }