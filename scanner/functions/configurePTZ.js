function configurePTZ(mid) {
    $scope.presetAndControl = $translate.instant('kMore');
    $scope.ptzWakeCommand = "";
    $scope.ptzSleepCommand = "";
    $scope.ptzResetCommand = "";

    $scope.ptzMoveCommand = "undefined";
    $scope.ptzStopCommand = "";

    $scope.zoomInCommand = "";
    $scope.zoomOutCommand = "";
    $scope.zoomStopCommand = "zoomStop";
    $scope.canZoom = false;

    $scope.presetOn = true;
    $scope.controlToggle = "hide buttons";

    NVR.debug("configurePTZ: called with mid=" + mid);
    var ld = NVR.getLogin();
    var url = ld.apiurl + "/monitors/" + mid + ".json?"+$rootScope.authSession;
    $http.get(url)
      .then(function (data) {
          data = data.data;
          $scope.isControllable = data.monitor.Monitor.Controllable;

          // *** Only for testing - comment out //
          //$scope.isControllable = '1';
          // for testing only
          // $scope.isControllable = 1;
          $scope.controlid = data.monitor.Monitor.ControlId;
          if ($scope.isControllable == '1') {

            var apiurl = NVR.getLogin().apiurl;
            var myurl = apiurl + "/controls/" + $scope.controlid + ".json?"+$rootScope.authSession;
            NVR.debug("configurePTZ : getting controllable data " + myurl);

            $http.get(myurl)
              .then(function (data) {
                  data = data.data;
                  // *** Only for testing - comment out  - start//
                  /*data.Control.Control.CanSleep = '1';
                  data.Control.Control.CanWake = '1';
                  data.Control.Control.CanReset = '1';
                  data.Control.Control.CanZoom = '1';
                  data.control.Control.HasPresets = '1';
                  data.control.Control.HasHomePreset = '1';*/
                  // *** Only for testing - comment out - end //


                  //data.control.Control.HasPresets = '1';
                  //data.control.Control.HasHomePreset = '1'


                  $scope.ptzMoveCommand = "move"; // start with as move;
                  $scope.ptzStopCommand = "";

                  // console.log ("GOT CONTROL "+JSON.stringify(data.control.Control));

                  if (data.control.Control.CanZoom == '1') {
                    $scope.canZoom = true;
                    if (data.control.Control.CanZoomCon == '1') {
                      $scope.zoomInCommand = "zoomConTele";
                      $scope.zoomOutCommand = "zoomConWide";

                    } else if (data.control.Control.CanZoomRel == '1') {
                      $scope.zoomInCommand = "zoomRelTele";
                      $scope.zoomOutCommand = "zoomRelWide";
                    } else if (data.control.Control.CanZoomAbs == '1') {
                      $scope.zoomInCommand = "zoomRelAbs";
                      $scope.zoomOutCommand = "zoomRelAbs";
                    }
                  }

                  NVR.debug("configurePTZ: control data returned " + JSON.stringify(data));


                  if (data.control.Control.CanMoveMap == '1') {

                    //seems moveMap uses Up/Down/Left/Right,
                    // so no prefix
                    $scope.ptzMoveCommand = "";
                    $scope.ptzStopCommand = "moveStop";
                    // console.log ("MoveAbs set");
                  }

                  if (data.control.Control.CanMoveAbs == '1') {

                    $scope.ptzMoveCommand = "moveAbs";
                    $scope.ptzStopCommand = "moveStop";
                    //  console.log ("MoveAbs set");
                  }

                  if (data.control.Control.CanMoveRel == '1') {

                    $scope.ptzMoveCommand = "moveRel";
                    $scope.ptzStopCommand = "moveStop";
                  }



                  // Prefer con over rel if both enabled
                  // I've tested con

                  if (data.control.Control.CanMoveCon == '1') {

                    $scope.ptzMoveCommand = "moveCon";
                    $scope.ptzStopCommand = "moveStop";
                  }
                  //CanMoveMap

                  // presets
                  NVR.debug("ConfigurePTZ Preset value is " + data.control.Control.HasPresets);
                  $scope.ptzPresets = [];




                  if (data.control.Control.HasPresets == '1') {
                    //$scope.presetAndControl = $translate.instant('kPresets');

                    $scope.ptzPresetCount = parseInt(data.control.Control.NumPresets);
                    //$scope.ptzPresetCount =80;

                    NVR.debug("ConfigurePTZ Number of presets is " + $scope.ptzPresetCount);

                    for (var p = 0; p < $scope.ptzPresetCount; p++) {
                      $scope.ptzPresets.push({
                        name: (p + 1).toString(),
                        icon: '',
                        cmd: "presetGoto" + (p + 1).toString(),
                        style: 'button-royal'
                      });

                    }

                    if (data.control.Control.HasHomePreset == '1') {
                      $scope.ptzPresets.unshift({
                        name: '',
                        icon: "ion-ios-home",
                        cmd: 'presetHome',
                        style: 'button-royal'
                      });

                    }

                    /* MAKE SURE THIS IS THE FIRST ICON */
                    $scope.ptzPresets.unshift({
                      // name: 'W',
                      icon: "ion-chevron-up",
                      cmd: 'special-hide-unhide',
                      style: 'button-royal button-dark ',
                    });


                  }
                  /*else
                  {
                      $scope.presetAndControl = $translate.instant('kMore');
                  }*/
                  // lets add these to the end
                  // strictly speaking, they aren't really presets, but meh for now

                  // no need to darken these buttons if presets are not there
                  var buttonAccent = "button-dark";
                  if ($scope.ptzPresets.length == 0) {
                    buttonAccent = "";
                  }

                  if (data.control.Control.CanWake == '1') {

                    $scope.ptzPresets.push({
                      name: 'W',
                      icon: "ion-eye",
                      cmd: 'wake',
                      style: 'button-royal ' + buttonAccent
                    });

                  }

                  if (data.control.Control.CanSleep == '1') {
                    $scope.ptzPresets.push({
                      name: 'S',
                      icon: "ion-eye-disabled",
                      cmd: 'sleep',
                      style: 'button-royal ' + buttonAccent
                    });

                  }

                  if (data.control.Control.CanReset == '1') {
                    $scope.ptzPresets.push({
                      name: 'R',
                      icon: "ion-ios-loop-strong",
                      cmd: 'reset',
                      style: 'button-royal ' + buttonAccent
                    });

                  }

                  NVR.log("ConfigurePTZ Modal: ControlDB reports PTZ command to be " + $scope.ptzMoveCommand);
                },
                function (data) {
                  //  console.log("** Error retrieving move PTZ command");
                  NVR.log("ConfigurePTZ : Error retrieving PTZ command  " + JSON.stringify(data), "error");
                });

          } else {
            NVR.log("configurePTZ " + mid + " is not PTZ controllable");
          }
        },
        function (data) {
          //  console.log("** Error retrieving move PTZ command");
          NVR.log("configurePTZ : Error retrieving PTZ command  " + JSON.stringify(data), "error");
        });

  }