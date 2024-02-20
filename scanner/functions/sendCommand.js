function sendCommand(cmd, connkey, extras, rq) {
    var d = $q.defer();

    if ($scope.defaultVideo !== undefined && $scope.defaultVideo != '') {
      // console.log("playing video, not using zms, skipping event commands");
      d.resolve(true);
      return (d.promise);
    }

    var loginData = NVR.getLogin();
    //console.log("Sending CGI command to " + loginData.url);
    var rqtoken = rq ? rq : "stream";

    var cmdUrl = loginData.url + '/index.php?view=request&request='+rqtoken+'&connkey='+connkey+'&command='+cmd+$rootScope.authSession;
    if (extras)
      cmdUrl = cmdUrl+extras;

    //&auth=

    NVR.debug ("Control: Sending "+cmdUrl);
    $http({
        //method: 'POST',
        method: 'GET',
        /*timeout: 15000,*/
        url: cmdUrl

      })
      .then(function (resp) {
          NVR.debug("sendCmd response:" + JSON.stringify(resp));
          d.resolve(resp);
          return (d.promise);

        },
        function (resp) {
          NVR.debug("sendCmd error:" + JSON.stringify(resp));
          d.reject(resp);
          return (d.promise);
        });

    return (d.promise);
  }