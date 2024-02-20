function loginWebScrape(u,zmu,zmp) {
    var d = $q.defer();
    NVR.debug("Logging in using old web-scrape method");

    $ionicLoading.show({
      template: $translate.instant('kAuthenticatingWebScrape'),
      noBackdrop: true,
      duration: zm.httpTimeout
    });

    u = u + '/index.php?view=console';
    NVR.debug("webscrape login to:"+u);
   
    //NVR.debug ("*** AUTH LOGIN URL IS " + loginData.url);
    $http({
        method: 'post',
        timeout: zm.httpTimeout,
        //withCredentials: true,
        url: u ,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        transformRequest: NVR.object_to_query_string,
        data: {
          username: zmu,
          password: zmp,
          action: "login",
          view: "console"
        }
      })
      .then(function (data, status, headers) {
          // console.log(">>>>>>>>>>>>>> PARALLEL POST SUCCESS");
          data = data.data;
          $ionicLoading.hide();

         // console.log ("GOT "+data);

          if (data.indexOf(zm.loginScreenString1) >=0 || 
          data.indexOf(zm.loginScreenString2) >=0 ) {
            //eventServer.start();
            //$rootScope.loggedIntoZm = 1;

            NVR.log("zmAutologin successfully logged into Zoneminder");
            $scope.wizard.loginURL = $scope.wizard.fqportal;
            $scope.wizard.portalValidText = $translate.instant('kPortal') + ": " + $scope.wizard.loginURL;
            $scope.wizard.portalColor = "#16a085";
            d.resolve(true);
            return d.promise;

            // now go to authKey part, so don't return yet...

          } else //  this means login error
          {
            // $rootScope.loggedIntoZm = -1;
            //console.log("**** ZM Login FAILED");
            NVR.log("zmAutologin web scrape Error: Bad Credentials ", "error");
            $scope.wizard.portalValidText = $translate.instant('kPortalDetectionFailed');
            $scope.wizard.portalColor = "#e74c3c";
            d.reject("Login Error");
            return (d.promise);
            // no need to go to next code, so return above
          }

          // Now go ahead and re-get auth key 
          // if login was a success
        },
        function (error, status) {

          // console.log(">>>>>>>>>>>>>> PARALLEL POST ERROR");
          $ionicLoading.hide();

          //console.log("**** ZM Login FAILED");

          // FIXME: Is this sometimes results in null

          NVR.log("zmAutologin Error " + JSON.stringify(error) + " and status " + status);
          // bad urls etc come here
          //$rootScope.loggedIntoZm = -1;
          $scope.wizard.portalValidText = $translate.instant('kPortalDetectionFailed');
          $scope.wizard.portalColor = "#e74c3c";
        
          d.reject("Login Error");
          return d.promise;
        });
    return d.promise;
  }