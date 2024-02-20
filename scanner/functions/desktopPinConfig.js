function desktopPinConfig() {
    $scope.data = {};     
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<small>'+$translate.instant('kPinProtect')+'</small><input type="password" ng-model="data.p1"><br/><small>'+$translate.instant('kReconfirmPin')+'</small><input type="password" ng-model="data.p2">',
      title: $translate.instant('kPinProtect'),
      scope: $scope,
      buttons: [
        { text: 'Cancel',
          type: 'button-assertive',
          onTap: function (e) {
            $scope.loginData.usePin = false;
          }
        },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.p1) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              if ($scope.data.p1 == $scope.data.p2) {
                NVR.log ("Pin code match");
                $scope.loginData.pinCode = $scope.data.p1;
              } else {
                $ionicLoading.show({
                  template: $translate.instant('kBannerPinMismatch') + "...",
                  noBackdrop: true,
                  duration: 1500
                });
                NVR.log ("Pin code mistmatch match");
                $scope.loginData.usePin = false;
                e.preventDefault();
              }
            }
          } // end Tap
        }
      ]
    });
  }