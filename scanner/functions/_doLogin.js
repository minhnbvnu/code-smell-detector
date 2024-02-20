function _doLogin(str) {
      var d = $q.defer();
      $rootScope.loginInProgress = true;

      if ($rootScope.userCancelledAuth) {
        NVR.debug ('_doLogin - not proceeding as user cancelled auth');
        $rootScope.loginInProgress = false;
        d.reject(false);
        return d.promise;
      }
      var ld = NVR.getLogin();

      //var statename = $ionicHistory.currentStateName();
      NVR.debug("Inside _doLogin()");

/*
      if (statename == "montage-history") {
        NVR.log("Skipping login process as we are in montage history. Re-logging will mess up the stream");
        d.resolve("success");
        return d.promise;

      }
*/
      NVR.isReCaptcha()
      .then(function (result) {
        if (result == true) {
          $ionicLoading.hide();
        
          NVR.displayBanner('error', ['reCaptcha must be disabled', ], "", 8000);
          var alertPopup = $ionicPopup.alert({
            title: 'reCaptcha enabled',
            template: $translate.instant('kRecaptcha'),
            okText: $translate.instant('kButtonOk'),
            cancelText: $translate.instant('kButtonCancel'),
          });

          // close it after 5 seconds
          $timeout(function () {
            alertPopup.close();
          }, 5000);

          $rootScope.loginInProgress = false;
          d.reject("Error-disable recaptcha");
          return (d.promise);
        }
      });

      NVR.debug("Resetting zmCookie...");
      $rootScope.zmCookie = '';
      // first try to login, if it works, good
      // else try to do reachability

      //console.log(">>>>>>>>>>>> CALLING DO LOGIN");
      NVR.proceedWithLogin()
        .then(function (success) {
            //NVR.debug("Storing login time as " + moment().toString());
            localforage.setItem("lastLogin", moment().toString());
            $rootScope.loginInProgress = false;
            d.resolve(success);
            return d.promise;
          },
          function (error) {
              $ionicLoading.hide();
              $rootScope.loginInProgress = false;
              d.reject(error);
              return d.promise;
          });
      return d.promise;
    }