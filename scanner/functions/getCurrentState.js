function getCurrentState() {
    NVR.debug("StateCtrl: getting state using " + apiCurrentState);
    $http.get(apiCurrentState)
      .then(
        function (success) {
          NVR.debug("State results: " + JSON.stringify(success));
          var customStateArray = success.data.states;
          var i = 0;
          var found = false;
          $scope.allStateNames = [];
          for (i = 0; i < customStateArray.length; i++) {
            $scope.allStateNames.push(customStateArray[i].State.Name);
            if (customStateArray[i].State.IsActive == '1') {
              $scope.customState = customStateArray[i].State.Name;
              found = true;
            }
          }
          if (!found) $scope.customState = "";

        },
        function (error) {
          NVR.debug("StateCtrl: Error retrieving state list " + JSON.stringify(error));
          $scope.customState = "";

        }
      );

  }