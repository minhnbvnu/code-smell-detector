function resizeComplete() {
           //console.log ("HERE");
           $timeout(function () {
             var positions = pckry.getShiftPositions('data-item-id');
             //console.log("SAVING");
             var ld = NVR.getLogin();

             ld.packeryPositions = JSON.stringify(positions);
             //console.log ("Saving " + ld.packeryPositions);
             ld.currentMontageProfile = "";
             $scope.currentProfileName = $translate.instant('kMontage');
             NVR.setLogin(ld);
             $ionicLoading.hide();
             $scope.sliderChanging = false;
           }, 20);
         }