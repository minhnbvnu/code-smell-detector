function imageLoaded() {

    currentStreamState = streamState.ACTIVE;

    NVR.debug("imgeLoaded");
    if ($scope.animationInProgress) return;
    /*
    var img = document.getElementById("singlemonitor");
    $scope.cw = img.naturalWidth;
    $scope.ch = img.naturalHeight;


    $scope.zoneArray = [];
    $scope.circlePoints = [];

    var ow = $scope.monitor.Monitor.Width;
    var oh = $scope.monitor.Monitor.Height;*/

    // console.log ("MONITOR IS: "+JSON.stringify($scope.monitor));

    // console.log ("ORIGINAL WH="+ow+"x"+oh);

    /*for (var i = 0; i < originalZones.length; i++) {
      var sx = $scope.cw / ow;
      var sy = $scope.ch / oh;
      $scope.zoneArray.push({
        coords: originalZones[i].coords,
        type: originalZones[i].type
      });


    }*/

    // now create a points array for circle handles

    /* for (i = 0; i < $scope.zoneArray.length; i++) {
      //jshint loopfunc: true
      $scope.zoneArray[i].coords.split(' ')
        .forEach(function (itm) {
          var o = itm.split(',');
          $scope.circlePoints.push({
            x: o[0],
            y: o[1],
            zoneIndex: i
          });

          // console.log ("CIRCLE X="+o[0]+"Y="+o[1]);
        });

  }*/

    $scope.isModalStreamPaused = false;
    NVR.debug("Modal image loaded, switching to streaming");
  }