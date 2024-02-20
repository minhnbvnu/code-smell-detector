function loadModalNotifications() {
    if (NVR.versionCompare($rootScope.apiVersion, "1.30") == -1) {
      return;
    }

    var ld = NVR.getLogin();
    if (ld.enableLowBandwidth)
      return;

    var status = [$translate.instant('kMonIdle'),
      $translate.instant('kMonPreAlarm'),
      $translate.instant('kMonAlarmed'),
      $translate.instant('kMonAlert'),
      $translate.instant('kMonRecord')
    ];
    //console.log ("Inside Modal timer...");
    var apiurl = ld.apiurl;
    var alarmurl = apiurl + "/monitors/alarm/id:" + $scope.monitorId + "/command:status.json?" + $rootScope.authSession;
    NVR.log("Invoking " + alarmurl);

    $http.get(alarmurl)
      .then(function (data) {
          //  NVR.debug ("Success in monitor alarmed status " + JSON.stringify(data));
          $scope.monStatus = status[parseInt(data.data.status)];
        },
        function (error) {
          $scope.monStatus = "";
          NVR.debug("Error in monitor alarmed status ");
        });
  }