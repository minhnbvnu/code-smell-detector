function dragToggle() {
    var i;
    $scope.isDragabillyOn = !$scope.isDragabillyOn;
    $ionicSideMenuDelegate.canDragContent($scope.isDragabillyOn ? false : true);
    //$timeout(function(){pckry.reloadItems();},10);
    NVR.debug("setting dragabilly to " + $scope.isDragabillyOn);
    if ($scope.isDragabillyOn) {
      $scope.showSizeButtons = true;
      $scope.dragBorder = "dragborder";
      NVR.debug("Enabling drag for " + draggies.length + " items");
      for (i = 0; i < draggies.length; i++) {
        draggies[i].enable();
        draggies[i].bindHandles();
      }
      // reflow and reload as some may be hidden
      //  $timeout(function(){pckry.reloadItems();$timeout(function(){pckry.layout();},300);},100);
    } else {
      $scope.dragBorder = "";
      NVR.debug("Disabling drag for " + draggies.length + " items");
      for (i = 0; i < draggies.length; i++) {
        draggies[i].disable();
        draggies[i].unbindHandles();
      }
      for (i = 0; i < $scope.MontageMonitors.length; i++) {
        $scope.MontageMonitors[i].Monitor.selectStyle = "";
      }
      // reflow and reload as some may be hidden
      $timeout(function () {
        $timeout(function () {
          pckry.shiftLayout();
    
        }, 300);
      }, 100);
    }
  }