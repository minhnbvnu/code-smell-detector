function toggleGroup(event, ndx, frames, groupType) {
      // If we are here and there is a record of a previous scroll
      // then we need to scroll back to hide that view
      if (scrollbynumber) {
        $ionicScrollDelegate.$getByHandle("mainScroll").scrollBy(0, -1 * scrollbynumber, true);
        scrollbynumber = 0;
      }

      if (scrubOngoing) { 
        NVR.debug("making sure scrub is off");
        scrubOngoing = false;
      }

      if (oldEvent && event != oldEvent) {
        NVR.debug("EventCtrl:Old event scrub will hide now");
        oldEvent.Event.ShowScrub = false;
        oldEvent.Event.rowHeight = getRowHeight(oldEvent);
        oldEvent = "";
      }

      event.Event.ShowScrub = !event.Event.ShowScrub;
      var currentRowHeight = getRowHeight(event);
      event.Event.rowHeight = currentRowHeight;

      if (event.Event.ShowScrub == false) {
        $ionicListDelegate.canSwipeItems(true);
        //NVR.debug("enabling options swipe due to toggle");
      } else {
        $ionicListDelegate.canSwipeItems(false);
        $ionicListDelegate.closeOptionButtons();
       // NVR.debug("disabling options swipe due to toggle");
      }
      //console.log ("SCRUBBING IS "+event.Event.ShowScrub);
      // $ionicScrollDelegate.resize();

      //console.log ("GROUP TYPE IS " + groupType);

      if (event.Event.ShowScrub == true) {
        // turn on display now

        if (groupType == 'alarms') {
          // $ionicListDelegate.canSwipeItems(false);
          //NVR.debug ("Disabling flag swipe as alarms are swipable");
          $scope.alarm_images = [];
          $ionicScrollDelegate.resize();
          var myurl = loginData.apiurl + '/events/' + event.Event.Id + ".json?"+$rootScope.authSession;
          NVR.log("API for event details" + myurl);
          $http.get(myurl)
            .then(function (data) {
                data = data.data;
       
             //  var ndata = data.replace(/<pre class="cake-error">/,'');
           //    console.log ("NDATA:"+ndata);
                //<pre class="cake-error">

                $scope.FrameArray = data.event.Frame;
                //  $scope.slider_options.scale=[];

                //$scope.slider_options.scale = [];

                var i;
                var timestamp = null;
                for (i = 0; i < data.event.Frame.length; i++) {
                  if (data.event.Frame[i].Type == "Alarm") {

                    //console.log ("**ONLY ALARM AT " + i + "of " + data.event.Frame.length);
                    var atype;
                    if (timestamp != data.event.Frame[i].TimeStamp) {

                      atype = $translate.instant('kShowTimeDiffFrames');
                    } else {
                      atype = $translate.instant('kShowAllFrames');
                    }
                    $scope.alarm_images.push({
                      type: atype,
                      id: data.event.Frame[i].Id,
                      frameid: data.event.Frame[i].FrameId,
                      score: data.event.Frame[i].Score,
                      fname: padToN(data.event.Frame[i].FrameId, eventImageDigits) + "-capture.jpg",
                      aname: padToN(data.event.Frame[i].FrameId, eventImageDigits) + "-analyse.jpg",
                      time: data.event.Frame[i].TimeStamp
                    });
                    timestamp = data.event.Frame[i].TimeStamp;
                  }

                }
                oldEvent = event;

                //console.log (JSON.stringify(data));
              },
              function (err) {
                NVR.log("Error retrieving detailed frame API " + JSON.stringify(err));
               // NVR.displayBanner('error', ['could not retrieve frame details', 'please try again']);
              });

        } // end of groupType == alarms
        else // groupType == scrub
        {

          NVR.debug("EventCtrl: Scrubbing will turn on now");
          scrubOngoing = true;
          $scope.currentEvent = "";
          $scope.event = event;
          //$ionicScrollDelegate.freezeScroll(true);
          $ionicSideMenuDelegate.canDragContent(false);
          $scope.slider_options = {
            from: 1,
            to: event.Event.Frames,
            realtime: true,
            step: 1,
            className: "mySliderClass",
            callback: function (value, released) {
              //console.log("CALLBACK"+value+released);
              $ionicScrollDelegate.freezeScroll(!released);
              //NVR.debug("EventCtrl: freezeScroll called with " + !released);

            },
            //modelLabels:function(val) {return "";},
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

          $ionicScrollDelegate.resize();

          $scope.mycarousel.index = 0;
          $scope.ionRange.index = 1;
          //console.log("**Resetting range");
          $scope.slides = [];
          var i;

          
            var myurl_frames = loginData.apiurl + '/events/' + event.Event.Id + ".json?"+$rootScope.authSession;
            NVR.log("API for event details" + myurl_frames);
            $http.get(myurl_frames)
              .then(function (data) {
                  data = data.data;
                  $scope.FrameArray = data.event.Frame;
                  //  $scope.slider_options.scale=[];

                  //$scope.slider_options.scale = [];

                  var i;
                  for (i = 0; i < data.event.Frame.length; i++) {

                    //console.log ("**ONLY ALARM AT " + i + "of " + data.event.Frame.length);
                    $scope.slides.push({
                      id: data.event.Frame[i].Id,
                      frameid: data.event.Frame[i].FrameId,

                    });

                  }

                  //console.log (JSON.stringify(data));
                },
                function (err) {
                  NVR.log("Error retrieving detailed frame API " + JSON.stringify(err));
                  NVR.displayBanner('error', [$translate.instant('kErrorFrameBanner'), $translate.instant('kErrorPleaseTryAgain')]);
                });

          

          // now get event details to show alarm frames
          loginData = NVR.getLogin();

          if (typeof event.Event.DefaultVideo === 'undefined')
            event.Event.DefaultVideo = "";
          // grab video details
          event.Event.video = {};
          var videoURL;

        
          videoURL = event.Event.recordingURL + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + event.Event.Id;
          videoURL += $rootScope.authSession;
          videoURL += NVR.insertSpecialTokens();


         //  console.log("************** VIDEO IS " + videoURL);
          event.Event.video.config = {
            autoPlay: true,
            sources: [{
                src: $sce.trustAsResourceUrl(videoURL),
                type: "video/mp4"
              }

            ],

            theme: "external/videogular2.2.1/videogular.min.css",

          };

          var myurl2 = loginData.apiurl + '/events/' + event.Event.Id + ".json?"+$rootScope.authSession;
          NVR.log("API for event details" + myurl2);
          $http.get(myurl2)
            .then(function (data) {
                data = data.data;
                $scope.FrameArray = data.event.Frame;
                //  $scope.slider_options.scale=[];
                $scope.slider_options.scale = [];

                var i;
                for (i = 0; i < data.event.Frame.length; i++) {
                  if (data.event.Frame[i].Type == "Alarm") {

                    //console.log ("**ALARM AT " + i + "of " + data.event.Frame.length);
                    $scope.slider_options.scale.push({
                      val: data.event.Frame[i].FrameId,
                      label: ' '
                    });
                  } else {
                    //$scope.slider_options.scale.push(' ');
                  }

                }

                //console.log (JSON.stringify(data));
              },
              function (err) {
                NVR.log("Error retrieving detailed frame API " + JSON.stringify(err));
                NVR.displayBanner('error', [$translate.instant('kErrorFrameBanner'), $translate.instant('kErrorPleaseTryAgain')]);
              });

          oldEvent = event;
          $rootScope.rand = Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111;
          var elem = angular.element(document.getElementById("item-" + ndx));
          var locobject = $ionicPosition.offset(elem);
          //console.log(JSON.stringify(locobject));
          var toplocation = parseInt(locobject.top);
          var objheight = parseInt(locobject.height);
          // console.log("top location is " + toplocation);
          var distdiff = parseInt($rootScope.devHeight) - toplocation - objheight;

          if (distdiff < currentRowHeight) // size of the scroller with bars
          {
            scrollbynumber = currentRowHeight - distdiff;
            $ionicScrollDelegate.$getByHandle("mainScroll").scrollBy(0, scrollbynumber, true);

            // we need to scroll up to make space
          }
          // console.log("*****Space at  bottom is " + distdiff);
        } // end of groupType == scrub 
      } // end of ShowScrub == true
      else {
        // $ionicScrollDelegate.freezeScroll(false);
        // 
        // $ionicListDelegate.canSwipeItems(true);
        // NVR.debug ("enabling options swipe");
        $ionicSideMenuDelegate.canDragContent(true);
        $ionicScrollDelegate.resize();

        if (scrollbynumber) {
          $ionicScrollDelegate.$getByHandle("mainScroll").scrollBy(0, -1 * scrollbynumber, true);
          scrollbynumber = 0;
        }
        // we are turning off, so scroll by back
      }

    }