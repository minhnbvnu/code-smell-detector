function processEvent() {
    var eid = $scope.event.Event.Id;
    //eid = 22302;
    var ld = NVR.getLogin();
    var apiurl = ld.apiurl + "/events/" + eid + ".json?"+$rootScope.authSession;
    NVR.log("Getting " + apiurl);
    $http.get(apiurl)
      .then(function (success) {
          //$scope.eventdetails = JSON.stringify(success);
          drawGraphTC(success.data);
        },
        function (error) {
          $scope.errorDetails = $translate.instant('kGraphError');
          NVR.log("Error in timeline frames " + JSON.stringify(error));
        });
  }