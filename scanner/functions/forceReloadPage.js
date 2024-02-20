function forceReloadPage() {
      if ($scope.isDragabillyOn) {
        NVR.debug('not reloading, edit in progress');
        return;
      }

      var ld = NVR.getLogin();
      ld.reloadInMontage = true;
      NVR.log('Reloading view to keep memory in check...');
      NVR.setLogin(ld)
        .then(function () {
          //window.location.reload(true);
          //location.reload();
          //$ionicHistory.clearCache();
          //$state.go('app.montage');

          /*$ionicHistory.clearCache([$state.current.name]).then(function() {
              $state.go('app.montage', $stateParams, {reload:true, inherit:false});
            });*/
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });

          $state.go('app.refresh', {
            "view": 'app.montage'
          });
        });

      /*$ionicHistory.nextViewOptions(
       {
           disableAnimate: true,
           disableBack: true
       });
       $state.go("app.montage",
       {
           minimal: $scope.minimal,
           isRefresh: true
       });*/
    }