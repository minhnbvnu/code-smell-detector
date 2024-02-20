function triggerAlarm(mid, mode) {
      var apiurl = NVR.getLogin().apiurl;
      var c = mode == 'on' ? 'on' : 'off';
      var alarmurl = apiurl + "/monitors/alarm/id:" + mid + "/command:" + c + ".json?"+$rootScope.authSession;
      NVR.log("Invoking " + alarmurl);


      var status = mode ? $translate.instant('kForcingAlarm') : $translate.instant('kCancellingAlarm');
      $ionicLoading.show({
        template: status,
        noBackdrop: true,
        duration: zm.largeHttpTimeout,
      });

      $http.get(alarmurl)
        .then(function (data) {
            $ionicLoading.show({
              template: $translate.instant('kSuccess'),
              noBackdrop: true,
              duration: 2000,
            });


          },
          function (error) {

            $ionicLoading.show({
              template: $translate.instant('kAlarmAPIError'),
              noBackdrop: true,
              duration: 3000,
            });
            NVR.debug("Error in triggerAlarm " + JSON.stringify(error));
          });
    }