function tapOrHover(ndx) {

    $timeout(function () {

      //console.log ("You tapped " + ndx);
      $scope.alarm_images = [];
      $scope.playbackURL = $scope.event.Event.recordingURL;
      var items = current_data.datasets[0].frames[ndx];
      $scope.alarm_images.push({
  
        fid: items.fid,
        id: items.id,
        fname: items.fname,
        score: items.score,
        time: moment(items.x).format("MMM D," + NVR.getTimeFormatSec()),
        eid: items.eid
      });
    });

  }