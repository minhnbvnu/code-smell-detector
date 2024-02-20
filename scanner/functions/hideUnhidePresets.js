function hideUnhidePresets() {
    //console.log ("**********HIDEUNHIDE");
    $scope.ptzButtonsShown = !$scope.ptzButtonsShown;

    if ($scope.ptzPresets.length > 0) {
      dirn = $scope.ptzButtonsShown ? "up" : "down";

      $scope.ptzPresets[0].icon = "ion-chevron-" + dirn;
    }

  }