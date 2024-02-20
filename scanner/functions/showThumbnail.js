function showThumbnail (event) {
    //console.log ("EVENT IS "+JSON.stringify(event));
    var stream = "";
    stream = event.Event.recordingURL +
      "/index.php?view=image&fid=" +
      NVR.getSnapshotFrame()+"&eid="+event.Event.Id  + "&width=400" ;
    stream += $rootScope.authSession;
    stream += NVR.insertSpecialTokens();
    $timeout ( function () {

        $scope.thumbData = {
            url: stream,
            eid: event.Event.Id,
            time: prettifyTimeSec(event.Event.StartTime),
            monName: event.Event.MonitorName,
            notes: event.Event.Notes
        };
      
    });
  }