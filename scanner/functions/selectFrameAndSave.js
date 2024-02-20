function selectFrameAndSave(onlyAlarms, eid) {
    // The strategy here is to build the array now so we can grab frames
    // $scope.currentProgress.progress is the seconds where we are
    // $scope.eventId is the event Id

    $scope.isPaused = true;

    $ionicLoading.show({
      template: $translate.instant('kPleaseWait'),
      noBackdrop: true,
      duration: zm.httpTimeout
    });
    sendCommand('1', $scope.connKey).
    then(function (resp) {

       // console.log("PAUSE ANSWER IS " + JSON.stringify(resp));

        if (resp && resp.data && resp.data.status)
          $scope.currentProgress.progress = resp.data.status.progress;
        else
          if (!handle) $scope.currentProgress.progress = 100;

        // console.log ("STEP 0 progress is " + $scope.currentProgress.progress);
        $scope.slides = [];

        var apiurl = $scope.loginData.apiurl + "/events/" + $scope.eventId + ".json?"+$rootScope.authSession;
        NVR.debug("prepared to get frame details using " + apiurl);
        $http.get(apiurl)
          .then(function (success) {

              event = success.data.event;

              event.Event.BasePath = computeBasePath(event);
              event.Event.relativePath = computeRelativePath(event);
              $scope.playbackURL = $scope.loginData.url;
              $scope.eventBasePath = event.Event.BasePath;
              $scope.relativePath = event.Event.relativePath;

              // now lets get approx frame #

              var totalTime ;

              if (handle) {
                totalTime = handle.totalTime/1000;
              } else {
                totalTime = event.Event.length;
              }

              var totalFrames = event.Event.Frames;


              var myFrame = Math.round(totalFrames / totalTime * $scope.currentProgress.progress);

              //console.log ('CURREN PROGRESS='+$scope.currentProgress.progress);
              //console.log ('MYFRAME = '+myFrame);
              //console.log ("STEP 0: playback " + $scope.playbackURL + " total time " + totalTime + " frames " + totalFrames);

              if (myFrame > totalFrames) myFrame = totalFrames;

              //  console.log ("STEP 0 myFrame is " + myFrame);
              // console.log ("DUMPING " + JSON.stringify(event));
              $scope.mycarousel.index = myFrame;
              // console.log ("STEP 1 : Computed index as "+  $scope.mycarousel.index);
              var i, p = 0;
              for (i = 1; i <= event.Frame.length; i++) {
                var fname = padToN(event.Frame[i - 1].FrameId, eventImageDigits) + "-capture.jpg";
                // console.log ("Building " + fname);

                // console.log ("DUMPING ONE " + JSON.stringify(event.Frame[i-1]));
                // onlyAlarms means only copy alarmed frames
                if (onlyAlarms) {
                  if (event.Frame[i - 1] && event.Frame[i - 1].Type == 'Alarm') {
                    p++;
                    $scope.slides.push({
                      id: event.Frame[i - 1].FrameId,
                      img: fname,
                    });
                    //console.log ("ALARM PUSHED " + fname);
                  }
                } else // push all frames
                {
                  //now handle bulk frames pushing before pushing this one
                  if (event.Frame[i - 1].Type == 'Bulk') {
                    var f1 = parseInt(event.Frame[i - 2].FrameId);
                    var f2 = parseInt(event.Frame[i - 1].FrameId);

                    //console.log ("Filling in bulk from:"+f1+" to "+(f2-1));
                    for (var bulk = f1 + 1; bulk < f2; bulk++) {
                      //console.log ("Storing bulk:"+bulk);
                      var bfname = padToN(bulk, eventImageDigits) + "-capture.jpg";
                      p++;
                      $scope.slides.push({
                        id: bulk,
                        img: bfname

                      });


                    }
                  }
                  //console.log ("storing: "+event.Frame[i - 1].FrameId);
                  p++;
                  $scope.slides.push({
                    id: event.Frame[i - 1].FrameId,
                    img: fname,
                  });



                }

              }
              //console.log ("I PUSHED:" + p+" BUT SLIDE LENGHT BEFORE DISPLAY:"+$scope.slides.length);
              //  console.log ("STEP 2 : calling Save Event To Phone");
              $ionicLoading.hide();
              saveEventImageToPhone(onlyAlarms, eid);

            },
            function (err) {
              $ionicLoading.hide();
              NVR.log("snapshot API Error: Could not get frames " + JSON.stringify(err));

              $ionicLoading.show({
                template: $translate.instant('kErrorRetrievingFrames'),
                noBackdrop: true,
                duration: 4000
              });
            });
      },

      function (err) {
        NVR.debug("Error pausing stream before snapshot " + JSON.stringify(err));
        $ionicLoading.hide();
      }

    ); // then

  }