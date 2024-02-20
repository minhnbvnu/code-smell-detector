function allImagesLoadedOrFailed() {
        $scope.areImagesLoading = false;
        currentStreamState = streamState.SNAPSHOT;
        if (simulStreaming) {
          $timeout(function () {
            NVR.debug("Switching mode to streaming as multi-port on...");
            //NVR.regenConnKeys();
            //randEachTime();
            currentStreamState = streamState.ACTIVE;
            d.resolve(true);
            return d.promise;
          },300);
        } else {
          NVR.debug("Not Switching mode to streaming as multi-port off...");
        }

        $ionicLoading.hide();
        pckry.getItemElements().forEach(function (itemElem) {
          draggie = new Draggabilly(itemElem);
          pckry.bindDraggabillyEvents(draggie);
          draggies.push(draggie);
          draggie.disable();
          draggie.unbindHandles();
        });

        pckry.on('dragItemPositioned', itemDragged);

        if (!isEmpty(positions)) {
          NVR.debug("Arranging as per packery grid");

          for (var i = 0; i < $scope.MontageMonitors.length; i++) {
            for (var j = 0; j < positions.length; j++) {
              if ($scope.MontageMonitors[i].Monitor.Id == positions[j].attr) {
                if (isNaN(positions[j].size) || (positions[j].size == 0))
                  positions[j].size = 20;

                $scope.MontageMonitors[i].Monitor.gridScale = positions[j].size;

                if (!positions[j].display)
                  positions[j].display = 'show';

                $scope.MontageMonitors[i].Monitor.listDisplay = positions[j].display;
                // NVR.debug("Setting monitor ID: " + $scope.MontageMonitors[i].Monitor.Id + " to size: " + positions[j].size + " and display:" + positions[j].display);
              }
              //console.log ("Index:"+positions[j].attr+ " with size: " + positions[j].size);
            }
          }

          NVR.debug("All images loaded, doing image layout");
          $timeout(function () {
            //NVR.log("Force calling resize");
            ///pckry.reloadItems();
            ///positions is defined only if layouttype was false
            //(">>> Positions is " + JSON.stringify(positions));
            //console.log ('WHATEVER '+layouttype+"=>"+JSON.stringify(positions));
            /* for (var m=0; m < $scope.MontageMonitors.length; m++) {
                console.log ("mid:"+$scope.MontageMonitors[m].Monitor.Id+" with listDisplay="+$scope.MontageMonitors[m].Monitor.listDisplay + " and Function=" + $scope.MontageMonitors[m].Monitor.Function);
              }*/
            try {
              if (!layouttype && positions)
                pckry.initShiftLayout(positions, "data-item-id");
            } catch (e) {
              console.log('Error: '+JSON.stringify(e));
            }
            // now do a jiggle
            $timeout(function () {
              NVR.debug("inside drag items:doing the jiggle and dance...");

              pckry.once('layoutComplete', function() {
                var positions = pckry.getShiftPositions('data-item-id');
                //console.log ("POSITIONS MAP " + JSON.stringify(positions));
                var ld = NVR.getLogin();
                ld.packeryPositions = JSON.stringify(positions);
                //  console.log ("Saving " + ld.packeryPositions);
                // console.log ("FULL OBJECT "+ JSON.stringify(ld));
                //ld.currentMontageProfile = "";
                //$scope.currentProfileName = $translate.instant('kMontage');
                NVR.setLogin(ld);
                NVR.debug("saved new positions: " + ld.packeryPositions);
              });
              pckry.shiftLayout();

              //$scope.squeezeMonitors();
            }, 500);
          }, 100);
        } // endif (!isEmpty(positions))

        //pckry.onresize();
      }