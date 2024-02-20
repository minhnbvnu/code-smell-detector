function deleteEvent(id) {
    //$scope.eventList.showDelete = false;
    //curl -XDELETE http://server/zm/api/events/1.json
    var loginData = NVR.getLogin();
    var apiDelete = loginData.apiurl + "/events/" + id + ".json?"+$rootScope.authSession;
    NVR.debug("DeleteEvent: ID=" + id);
    NVR.log("Delete event " + apiDelete);

    $ionicLoading.show({
      template: "{{'kDeletingEvent' | translate}}...",
      noBackdrop: true,
      duration: zm.httpTimeout
    });

    return $http.delete(apiDelete)
      .then(function (data) {
          data = data.data;
          $ionicLoading.hide();
          // NVR.debug("delete output: " + JSON.stringify(data));

          if (data.message == 'Error') {
            $ionicLoading.show({
              template: "{{'kError' | translate}}...",
              noBackdrop: true,
              duration: 1500
            });

          } else {

            $ionicLoading.hide();
            $ionicLoading.show({
              template: "{{'kSuccess' | translate}}...",
              noBackdrop: true,
              duration: 1000
            });


          }

          // NVR.displayBanner('info', [$translate.instant('kDeleteEventSuccess')], 2000, 2000);




          //doRefresh();

        },
        function (data) {
          $ionicLoading.hide();
          NVR.debug("delete error: " + JSON.stringify(data));
          NVR.displayBanner('error', [$translate.instant('kDeleteEventError1'), $translate.instant('kDeleteEventError2')]);
        });
  }