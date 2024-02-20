function computeAlarmFrames(data) {
    $scope.alarm_images = [];
    tempAlarms = [];
    $scope.FrameArray = [];


    //console.log ("FRAME ARRAY: "+JSON.stringify(data));
    if (data.event && data.event.Frame) $scope.FrameArray = data.event.Frame;
    var ts = 0;
    if (!data.event.Frame) {
      data.event.Frame=[];
    }
    for (i = 0; i < data.event.Frame.length; i++) {
      if (data.event.Frame[i].Type == "Alarm") {

        // console.log ("**ONLY ALARM AT " + i + "of " + data.event.Frame.length);

        if (ts != data.event.Frame[i].TimeStamp) {
          tempAlarms.push({

            id: data.event.Frame[i].Id,
            frameid: data.event.Frame[i].FrameId,
          });
          ts = data.event.Frame[i].TimeStamp;
        }


      }

    }
    if (tempAlarms.length > 1) // don't do it for just one too
      $scope.alarm_images = tempAlarms;

      // add snapshot
    if (NVR.getSnapshotFrame() == 'snapshot') {
        $scope.alarm_images.unshift({
            frameid: 'snapshot',
            id: 'doesntseemtobeusedhuh'
        });
    }
    if (data.event.Event.Notes.indexOf('detected:') != -1) {

            NVR.debug ("You have object detection! Adding object detect frame");
            var frameid = 'objdetect';
            var ld = NVR.getLogin();
            if (!ld.showAnimation) {
              if (NVR.versionCompare(ld.currentServerVersion, '1.35') != -1) {
               frameid = 'objdetect_jpg';
              }

            }

            $scope.alarm_images.unshift({
                frameid: frameid,
                id: 'whatever'
             });

            NVR.debug ("Your ZM version is:"+NVR.getCurrentServerVersion()+" and your obj frame setting is:"+NVR.getLogin().showObjectDetectionFrame);

    } else {
      NVR.debug ("No object detection found in notes");
    }

  }