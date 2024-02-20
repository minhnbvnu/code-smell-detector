function selectCustomState() {
    $scope.myopt = {
      selectedState: ""
    };
    //console.log(JSON.stringify($scope.allStateNames));
    NVR.log("List of custom states: " + JSON.stringify($scope.allStateNames));
    $rootScope.zmPopup = $ionicPopup.show({
      scope: $scope,
      template: '<ion-radio-fix ng-repeat="item in allStateNames" ng-value="item" ng-model="myopt.selectedState"> {{item}} </ion-radio-fix>',

      title: $translate.instant('kSelectRunState'),
      subTitle: $translate.instant('kCurrentState') + $scope.customState ? ($translate.instant('kCurrentState') + ": " + $scope.customState) : "",
      buttons: [{
          text: $translate.instant('kButtonCancel'),
          onTap: function (e) {
            return "CANCEL";
          }

        },
        {
          text: $translate.instant('kButtonOk'),
          onTap: function (e) {
            return "OK";

          }
        }
      ]
    });

    // It seems invoking a popup within a popup handler
    // causes issues. Doing this outside due to that reason
    $rootScope.zmPopup.then(function (res) {
      // console.log("GOT : " + JSON.stringify(res));
      if (res == "OK") {
        if ($scope.myopt.selectedState != "")
          controlZM($scope.myopt.selectedState);
      }
    });
  }