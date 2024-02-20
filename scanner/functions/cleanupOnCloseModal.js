function cleanupOnCloseModal() {
      if (simulStreaming){
        randEachTime();
        NVR.debug('rand each time:'+randToAvoidCacheMem);
      }

      NVR.log("Restarting montage timers...");
      var ld = NVR.getLogin();
      // console.log ("closeModal: Cancelling timer");
      $interval.cancel(intervalHandleMontage);
      $interval.cancel(intervalHandleAlarmStatus);
      $interval.cancel(intervalHandleStreamQuery);
      $interval.cancel(intervalHandleEventStatus);
      $interval.cancel(intervalHandleMontageCycle);
      $interval.cancel(intervalHandleReloadPage);

      intervalHandleMontage = $interval(function () {
        loadNotifications();
        //  console.log ("Refreshing Image...");
      }.bind(this), refreshSec * 1000);

      intervalHandleAlarmStatus = $interval(function () {
        loadAlarmStatus();
        //  console.log ("Refreshing Image...");
      }.bind(this), zm.alarmStatusTime);

      if (simulStreaming){
        intervalHandleStreamQuery = $interval(function () {
          loadStreamQueryStatus();
          //console.log ("Restarting Query Timer...");
        }.bind(this), streamQueryTimer);
      }

      loadEventStatus(ld.showMontageSidebars);
      intervalHandleEventStatus = $interval(function () {
        loadEventStatus();
        //  console.log ("Refreshing Image...");
      }.bind(this), zm.eventCheckTime);

      intervalHandleMontageCycle = $interval(function () {
        cycleMontageProfiles();
        //  console.log ("Refreshing Image...");
      }.bind(this), 5000);

      intervalHandleReloadPage = $interval(function () {
        forceReloadPage();
      }.bind(this), reloadPage);

      $scope.isModalStreamPaused = true;
      // let modal go to snapshot mode in render
      $timeout(function () {
        $scope.modal.remove();
      });

      // We now need to regen connkeys
      // once regenerated
      if (simulStreaming) {
        currentStreamState = streamState.ACTIVE;
        NVR.debug('Regenerating connkeys so old kills wont affect');
        for (var i = 0; i < $scope.MontageMonitors.length; i++) {
          $scope.MontageMonitors[i].Monitor.connKey = NVR.genConnKey();
        }
      }
    }