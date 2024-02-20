function prepareModalEvent(eid) {


    // Lets get the detailed event API
    var loginData = NVR.getLogin();
    var myurl;
    if (loginData.retrieveFramesForEvents) {
      myurl = loginData.apiurl + '/events/' + eid + ".json?"+$rootScope.authSession;
    } else {
      myurl = loginData.apiurl + '/events/' + eid + ".json?noframes=true&"+$rootScope.authSession;
    }

    NVR.log("*** Constructed API for detailed events: " + myurl);
    $scope.humanizeTime = "...";
    $scope.mName = "...";
    $scope.liveFeedMid = $scope.mid;

    $http.get(myurl)
    .then(function (success) {

        var event = currentEvent = $scope.event = $scope.currentEvent = success.data.event;

        // console.log ("prepareModal DATA:"+JSON.stringify(success.data));
        computeAlarmFrames(success.data);
        $scope.eventWarning = '';

        if ((!event.Event.EndTime) && showLive) {
          $scope.eventWarning = $translate.instant('kEventStillRecording');
          // if this happens we get to live feed
          $scope.liveFeedMid = event.Event.MonitorId;
          NVR.log("Event not ready, setting live view, with MID=" + $scope.liveFeedMid);
        }

        event.Event.BasePath = computeBasePath(event);
        event.Event.relativePath = computeRelativePath(event);
        event.Event.streamingURL = NVR.getStreamingURL(event.Event.MonitorId);
        event.Event.recordingURL = NVR.getRecordingURL(event.Event.MonitorId);
        event.Event.imageMode = NVR.getImageMode(event.Event.MonitorId);

        //console.log (JSON.stringify( success));
        $scope.eventName = event.Event.Name;
        $scope.eventId = event.Event.Id;
        $scope.d_eventId = $scope.eventId;
        $scope.eFramesNum = event.Event.Frames;
        $scope.eventDur = Math.round(event.Event.Length);
        $scope.loginData = NVR.getLogin();
        $scope.humanizeTime = humanizeTime(event.Event.StartTime);
        $scope.mName = NVR.getMonitorName(event.Event.MonitorId);
        //console.log (">>>>>>>>HUMANIZE " + $scope.humanizeTime);

        // console.log("**** VIDEO STATE IS " + event.Event.DefaultVideo);
        if (typeof event.Event.DefaultVideo === 'undefined' || event.Event.DefaultVideo == '') {
          event.Event.DefaultVideo = "";
        }

        var ld = NVR.getLogin();
        if (ld.monitorSpecific[event.Event.MonitorId] && ld.monitorSpecific[event.Event.MonitorId].forceMjpeg) {
          NVR.debug('Monitor:'+event.Event.MonitorId+' has forced MJPEG playback');
          $scope.defaultVideo ='';
        } else {
          $scope.defaultVideo = event.Event.DefaultVideo;
        }

        $scope.connKey = (Math.floor((Math.random() * 999999) + 1)).toString();

        if (currentStreamState != streamState.SNAPSHOT)
          currentStreamState = streamState.ACTIVE;

        //console.log("loginData is " + JSON.stringify($scope.loginData));
        //console.log("Event ID is " + $scope.eventId);
        //console.log("video is " + $scope.defaultVideo);

        neighborEvents(event.Event.Id)
          .then(function (success) {
              $scope.nextId = success.next;
              $scope.prevId = success.prev;
            },
            function (error) {
              //console.log(JSON.stringify(error));
            });

        $scope.nextId = "...";
        $scope.prevId = "...";

        event.Event.video = {};
        var videoURL = event.Event.recordingURL + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + event.Event.Id;

        if ($rootScope.authSession != 'undefined') videoURL += $rootScope.authSession;
        if ($rootScope.basicAuthToken) videoURL = videoURL + "&basicauth=" + $rootScope.basicAuthToken;

        // hack
        //videoURL = "http://static.videogular.com/assets/videos/videogular.mp4";

        $scope.video_url = videoURL;

        //console.log("************** VIDEO IS " + videoURL);

        NVR.debug("Video url passed to player is: " + videoURL);

        $scope.videoObject = {
          config: {
            autoPlay: true,
            responsive: true,
            nativeControls: false,
            nativeFullScreen: true,

            playsInline: true,
            sources: [{
                src: $sce.trustAsResourceUrl(videoURL),
                type: "video/mp4"
              }
            ],
            theme: "external/videogular2.2.1/videogular.min.css",
            cuepoints: {
              theme: {
                url: "external/videogular2.2.1/videogular-cuepoints.min.css"
              },
              points: [],
            }
          }
        };

        // $scope.videoObject = angular.copy(event.Event.video);

        $scope.playbackURL = $scope.loginData.url;

        $scope.videoIsReady = true;

        /* we don't need this for electron
        if ($rootScope.platformOS == "desktop") {
            $scope.playbackURL = zm.desktopUrl;
        } */

        $scope.eventBasePath = event.Event.BasePath;
        $scope.relativePath = event.Event.relativePath;
        $rootScope.rand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;

        $scope.slider_modal_options = {
          from: 1,
          to: event.Event.Frames,
          realtime: true,
          step: 1,
          className: "mySliderClass",
          callback: function (value, released) {
            //console.log("CALLBACK"+value+released);
            $ionicScrollDelegate.freezeScroll(!released);

          },
          //modelLabels:function(val) {return "";},
          smooth: false,
          css: {
            background: {
              "background-color": "silver"
            },
            before: {
              "background-color": "purple"
            },
            default: {
              "background-color": "white"
            }, // default value: 1px
            after: {
              "background-color": "green"
            }, // zone after default value
            pointer: {
              "background-color": "red"
            }, // circle pointer
            range: {
              "background-color": "red"
            } // use it if double value
          },
          scale: []

        };

        $scope.mycarousel.index = 0;
        $scope.ionRange.index = 1;
        $scope.eventSpeed = $scope.event.Event.Length / $scope.event.Event.Frames;

        //console.log("**Resetting range");
        $scope.slides = [];
        var i;
        for (i = 1; i <= event.Event.Frames; i++) {
          var fname = padToN(i, eventImageDigits) + "-capture.jpg";
          // console.log ("Building " + fname);
          $scope.slides.push({
            id: i,
            img: fname
          });
        }

        // now get event details to show alarm frames

        //$scope.FrameArray = event.Frame;
        //  $scope.slider_options.scale=[];
        // $scope.slider_modal_options.scale = [];

        // lets
        framearray.datasets[0].data = [];
        for (i = 0; i < event.Frame.length; i++) {
          var ts = moment(event.Frame[i].TimeStamp).format(timeFormat);

          //console.log ("pushing s:" + event.Frame[i].Score+" t:"+ts);

          framearray.datasets[0].data.push({
            x: ts,
            y: event.Frame[i].Score
          });
          framearray.labels.push("");

        }
        $scope.totalEventTime = Math.round(parseFloat(event.Event.Length)) - 1;
        $scope.currentEventTime = 0;

        // video mode doesn't need this graph - it won't really work
        if ($scope.defaultVideo == undefined || $scope.defaultVideo == '') {
          $timeout(function () {
            drawGraph();
          }, 500);
        }

      },
      function (err) {
        NVR.log("Error retrieving detailed frame API " + JSON.stringify(err));
        // NVR.displayBanner('error', ['could not retrieve frame details']);
        $scope.eventWarning = $translate.instant('kLiveView');
          // if this happens we get to live feed
          $scope.liveFeedMid = $scope.mid;
      });
  }