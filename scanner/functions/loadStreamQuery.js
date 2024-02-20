function loadStreamQuery() {

    function appendConnKey(ck) {
      return "&connkey=" + ck;
    }

    function checkValidConnkey(query) {
      $http.get(query)
      .then (function (succ) {
        //console.log ("SUCCESS="+JSON.stringify(succ.data));

        if (succ.data && succ.data.result && succ.data.result == "Error") {
            NVR.log("Single view: regenerating Connkey as Failed:"+query);
            $scope.connKey = NVR.genConnKey();
            $scope.streamState = 'bad';
        } else if (succ.data && succ.data.result && succ.data.result == "Ok") {
          $scope.streamState = 'good';
        }
      },
      function (err) {
        NVR.log("Single View: Stream Query ERR="+JSON.stringify(err));
      });

    }

    //console.log (currentStreamState);
    if (currentStreamState != streamState.ACTIVE) return;

    NVR.debug('Single view: stream status check');

    var ld = NVR.getLogin();
    var query = ld.url+'/index.php?view=request&request=stream&command=99';
    query += $rootScope.authSession;
    query += appendConnKey($scope.connKey);
    checkValidConnkey(query);
  }