function loadStreamQueryStatus () {
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
  //console.log ("MONTAGE: "+currentStreamState);
  if (currentStreamState != streamState.ACTIVE || !simulStreaming) return;

  NVR.debug('Montage View: Stream Status check');

  for (var i=0; i < $scope.MontageMonitors.length; i++) {
    var monitor = $scope.MontageMonitors[i].Monitor;
    if ((monitor.Function == 'None') || (monitor.listDisplay == 'noshow')) {
      continue;
    }
    var query = monitor.recordingURL+'/index.php?view=request&request=stream&command=99';
    if (!monitor.connKey) {
      console.log("No connKey for "+monitor.Id);
      continue;
    }

    query += appendConnKey(monitor.connKey);
    query += $rootScope.authSession;
    //if (query) query += NVR.insertSpecialTokens();
    //console.log ("QUERY="+query);
    checkValidConnkey(query, i);
  }
}