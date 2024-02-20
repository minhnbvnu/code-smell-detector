function _doLogoutAndLogin(str) {
      NVR.debug("_doLogoutAndLogin: Clearing cookies");

      if (window.cordova) {
        // we need to do this or ZM will send same auth hash
        // this was fixed in a PR dated Oct 18
       
        cordova.plugin.http.clearCookies();
      }
    /*  else {
       angular.forEach($cookies, function (v, k) {
         $cookies.remove(k);
        });
      }*/
    
      $rootScope.userCancelledAuth = false;
      return NVR.getReachableConfig(false)
      .then (
        function(data ) {
         
        return NVR.logout()
        .then(function (ans) {
          return _doLogin(str);

        });
        },
        function (err) {
          NVR.log('No reachable config: '+JSON.stringify(err));
          $ionicHistory.nextViewOptions({
            disableAnimate:true,
            disableBack: true
          });
          if (!$rootScope.userCancelledAuth)
            $state.go("app.invalidapi");
          return;
        }
      );
    }