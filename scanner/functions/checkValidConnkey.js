function checkValidConnkey(query, i) {
    $http.get(query)
      .then (function (succ) {
        //console.log ("SUCCESS="+JSON.stringify(succ.data));
        if (succ.data && succ.data.result && succ.data.result == "Error") {
          $scope.MontageMonitors[i].Monitor.streamState = 'bad';
          NVR.log("Montage View: Regenerating Connkey as Failed:"+query);
          NVR.regenConnKeys($scope.MontageMonitors[i]);
        } else if (succ.data && succ.data.result && succ.data.result == "Ok"){
          $scope.MontageMonitors[i].Monitor.streamState = 'good';
          //console.log (JSON.stringify(succ));
        }
      },
        function (err) {
          NVR.log("Stream Query ERR="+JSON.stringify(err));
        });
  }