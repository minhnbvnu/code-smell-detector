function reloadMonitorDisplayStatus() {
        debug("Loading hidden/unhidden status for profile:" + loginData.currentMontageProfile);

        var positionsStr = loginData.packeryPositions;
        //console.log ("positionStr="+positionsStr);
        var positions = {};
        if (loginData.packeryPositions != '' && loginData.packeryPositions != undefined) {
          // console.log("positions=" + loginData.packeryPositions);

          try {
            positions = JSON.parse(positionsStr);
          } catch (e) {
            debug("error parsing positions");
          }

          for (var m = 0; m < monitors.length; m++) {
            var positionFound = false;
            for (var p = 0; p < positions.length; p++) {
              if (monitors[m].Monitor.Id == positions[p].attr) {
                monitors[m].Monitor.listDisplay = positions[p].display;
                positionFound = true;
                //debug("NVR: Setting MID:" + monitors[m].Monitor.Id + " to " + monitors[m].Monitor.listDisplay);
              }

            }
            if (!positionFound) {
              if (loginData.currentMontageProfile != $translate.instant('kMontageDefaultProfile')) {
                monitors[m].Monitor.listDisplay = 'noshow';
                //console.log("*************DISABLE NEW MONITOR");
              } else // make sure we add it because its show all view
              {
                monitors[m].Monitor.listDisplay = 'show';
                //console.log("*************ENABLE NEW MONITOR");
              }
            }
          } // end foreach monitor

        } else // if there are no packery positions, make sure all are displayed!
        {
          debug("no packery profile, making sure monitors are show");
          for (var m1 = 0; m1 < monitors.length; m1++) {
            monitors[m1].Monitor.listDisplay = 'show';
          }
        }
      }