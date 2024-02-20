function loadZMlogs() {
    var ld = NVR.getLogin();
    var lapi = ld.apiurl + "/logs.json?sort=TimeKey&direction=desc&page=" + $scope.zmPage+$rootScope.authSession;
    $http.get(lapi)
      .then(function (success) {
          $ionicLoading.hide();
          $scope.zmMaxPage = success.data.pagination.pageCount;
          // console.log ("PAGES="+$scope.zmMaxPage);
          var tLogs = "";
          // console.log (JSON.stringify(success));
          for (var i = 0; i < success.data.logs.length; i++) {
            tLogs = tLogs + moment.unix(success.data.logs[i].Log.TimeKey).format("MM/DD/YY hh:mm:ss") + " " +
              success.data.logs[i].Log.Code + " " +
              success.data.logs[i].Log.Message + "\n";
          }
          $scope.log.logString = tLogs;
        },
        function (error) {
          NVR.log("Error getting ZM logs:" + JSON.stringify(error));
          $scope.log.logString = "Error getting log: " + JSON.stringify(error);


        });

  }