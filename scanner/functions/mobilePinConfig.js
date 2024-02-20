function mobilePinConfig () {
  NVR.log("Password prompt");
  if ($scope.loginData.usePin) {
    $scope.loginData.pinCode = "";
    $cordovaPinDialog.prompt($translate.instant('kEnterPin'), $translate.instant('kPinProtect')).then(
      function (result1) {
        // console.log (JSON.stringify(result1));
        if (result1.input1 && result1.buttonIndex == 1) {
          $cordovaPinDialog.prompt($translate.instant('kReconfirmPin'), $translate.instant('kPinProtect'))
            .then(function (result2) {
              if (result1.input1 == result2.input1) {
                NVR.log("Pin code match");
                $scope.loginData.pinCode = result1.input1;
              } else {
                NVR.log("Pin code mismatch");
                $scope.loginData.usePin = false;
                NVR.displayBanner('error', [$translate.instant('kBannerPinMismatch')]);
              }
            },
              function (error) {
                //console.log("Error inside");
                $scope.loginData.usePin = false;
              });
        } else {
          $scope.loginData.usePin = false;
        }
      },
      function (error) {
        //console.log("Error outside");
        $scope.loginData.usePin = false;
      });
  } else {
    NVR.debug("Password disabled");
  }
}