function footerCollapse() {

    NVR.debug("Inside footerCollapse");
    if (readyToRun == false) {
      NVR.debug("fake call to footerCollapse - ignoring");
      return;
    }


    if ($scope.MontageMonitors == undefined) {
      NVR.debug("montage array is undefined and not ready");
      return;
    }

    $interval.cancel($rootScope.eventQueryInterval);
    $ionicLoading.show({
      template: $translate.instant('kPleaseWait'),
      noBackdrop: true,
      duration: zm.httpTimeout
    });

    $scope.dragBorder = "";
    $scope.isDragabillyOn = false;
    $ionicSideMenuDelegate.canDragContent(false);

    var apiurl;
    var ld = NVR.getLogin();
    $scope.sliderVal.realRate = $scope.sliderVal.rate * 100;

    var TimeObjectFrom = moment($scope.datetimeValueFrom.value).format("YYYY-MM-DD HH:mm");
    var TimeObjectTo = moment().format('YYYY-MM-DD HH:mm');

    // At this point of time, we need to ensure From and To are changed to server time
    //if (NVR.getLogin().useLocalTimeZone)

    var localtz = moment.tz.guess();
    var servertz = NVR.getTimeZoneNow();

    NVR.log("Local timezone conversion is on, converting from " + localtz + " to " + servertz);
    NVR.log("Original From: " + TimeObjectFrom + " Original To: " + TimeObjectTo);

    TimeObjectFrom = moment.tz(TimeObjectFrom, localtz).tz(servertz).format("YYYY-MM-DD HH:mm");
    TimeObjectTo = moment.tz(TimeObjectTo, localtz).tz(servertz).format("YYYY-MM-DD HH:mm");

    NVR.log("Converted From: " + TimeObjectFrom + " Converted To: " + TimeObjectTo);



    areStreamsStopped = true; // kill current view

    $timeout(function () {

      var i;
      if ($rootScope.platformOS != 'ios') {
        NVR.debug("Killing existing streams, if alive...");
        for (i = 0; i < $scope.MontageMonitors.length; i++) {
          if ($scope.MontageMonitors[i].Monitor.listDisplay == 'show' && $scope.MontageMonitors[i].Monitor.eventUrl != 'img/noimage.png') NVR.killLiveStream($scope.MontageMonitors[i].Monitor.connKey, $scope.MontageMonitors[i].Monitor.controlURL, $scope.MontageMonitors[i].Monitor.Name);
        }
      } else {
        NVR.stopNetwork("montage-history footerCollapse");
      }


      //NVR.regenConnKeys();
      //$scope.monitors = NVR.getMonitorsNow();
      //$scope.MontageMonitors = angular.copy($scope.monitors);

      NVR.debug(">>Initializing monitor array with history specific stuff...");
      for (i = 0; i < $scope.MontageMonitors.length; i++) {
        $scope.MontageMonitors[i].Monitor.eventUrl = 'img/noimage.png';
        $scope.MontageMonitors[i].Monitor.eventType = "";
        $scope.MontageMonitors[i].Monitor.eid = "-1";
        $scope.MontageMonitors[i].Monitor.eventUrlTime = "";
        $scope.MontageMonitors[i].Monitor.isPaused = false;
        $scope.MontageMonitors[i].Monitor.gridScale = "50";
        $scope.MontageMonitors[i].Monitor.selectStyle = "";
        $scope.MontageMonitors[i].Monitor.alarmState = 'color:rgba(0,0,0,0);';
        $scope.MontageMonitors[i].Monitor.sliderProgress = {
          progress: 0
        };
      }

      // let stopNetwork finish
      $timeout(function () {
        getNextSetHistory();
      });


    });


    function noop() {}
    
    function getNextSetHistory() {

      // grab events that start on or after the time 
      apiurl = ld.apiurl + "/events/index/"+"StartTime >=:" + TimeObjectFrom;
      if (ld.enableAlarmCount && ld.enableAlarmCount)
       apiurl+= "/"+"AlarmFrames >=:" + ld.minAlarmCount;

      apiurl+= ".json?sort=StartTime&direction=asc"+$rootScope.authSession;
      NVR.log("Grabbing history using: " + apiurl);
      // make sure there are no more than 5 active streams (noevent is ok)
      $scope.currentLimit = $scope.monLimit;
      //qHttp.get(apiurl)
      //console.log ("GETTING "+apiurl);
      $http({
        method: 'get',
        url: apiurl
      }).then(function (succ) {
        var data = succ.data;
        var ld = NVR.getLogin();
        NVR.debug("Got " + data.events.length + "new history events...");
        //console.log (JSON.stringify(data));
        var eid, mid, stime;
        for (i = 0; i < data.events.length; i++) {
          mid = data.events[i].Event.MonitorId;
          eid = data.events[i].Event.Id;
          
          var eType = (data.events[i].Event.DefaultVideo != '')? 'video':'jpeg';
          //console.log ("====SETTING video type to "+eType+" for "+mid);

          //console.log ("Event ID:"+eid);
          stime = data.events[i].Event.StartTime;
          // only take the first one for each monitor
          for (var j = 0; j < $scope.MontageMonitors.length; j++) {
            $scope.MontageMonitors[j].Monitor.isPaused = false;
            // that's the earliest match and play gapless from there
            if ($scope.MontageMonitors[j].Monitor.Id == mid) {
              if ($scope.MontageMonitors[j].Monitor.eventUrl == 'img/noimage.png') {
                // console.log ("Old value of event url " + $scope.MontageMonitors[j].eventUrl);
                //console.log ("ldurl is " + ld.streamingurl);
                var bw = NVR.getBandwidth() == "lowbw" ? zm.eventMontageQualityLowBW : ld.montageHistoryQuality;

                if (eType=='video') {
                  var videoURL= $scope.MontageMonitors[j].Monitor.baseURL  + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + eid;

                  videoURL += $rootScope.authSession;
                  if ($rootScope.basicAuthToken) videoURL = videoURL + "&basicauth=" + $rootScope.basicAuthToken;

          
                  $scope.MontageMonitors[j].Monitor.videoObject = {
                    config: {
                      autoPlay: true,
                      responsive: false,
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
                }
                
                $scope.MontageMonitors[j].Monitor.eventType = eType;
                $scope.MontageMonitors[j].Monitor.eventUrl = $scope.MontageMonitors[j].Monitor.streamingURL + "/nph-zms?source=event&mode=jpeg&event=" + eid + "&replay=gapless&rate=" + $scope.sliderVal.realRate + "&connkey=" + $scope.MontageMonitors[j].Monitor.connKey + "&scale=" + bw + $rootScope.authSession;
                //console.log ("Setting event URL to " +$scope.MontageMonitors[j].Monitor.eventUrl);
                //   console.log ("SWITCHING TO " + $scope.MontageMonitors[j].eventUrl);
                $scope.MontageMonitors[j].Monitor.eventUrlTime = stime;
                $scope.MontageMonitors[j].Monitor.eid = eid;
                $scope.MontageMonitors[j].Monitor.eventDuration = data.events[i].Event.Length;
                $scope.MontageMonitors[j].Monitor.sliderProgress = {
                  progress: 0
                };
                //console.log(">>> Setting Event for " + $scope.MontageMonitors[j].Monitor.Name + " to " + eid);
                // now lets get the API for that event for graphing
                $scope.MontageMonitors[j].Monitor.noGraph = true;

              }
            }
          } // for

        }
        // make sure we do our best to get that duration for all monitors
        // in the above call, is possible some did not make the cut in the first page
        NVR.log("Making sure all monitors have a fair chance...");
        var promises = [];
        for (i = 0; i < $scope.MontageMonitors.length; i++) {
          //console.log("Fair chance check for " + $scope.MontageMonitors[i].Monitor.Name);
          if ($scope.MontageMonitors[i].Monitor.eventUrl == 'img/noimage.png') {
            var indivGrab = ld.apiurl + "/events/index/MonitorId:" + $scope.MontageMonitors[i].Monitor.Id + "/"+"StartTime >=:" + TimeObjectFrom ;
            if (ld.enableAlarmCount && ld.minAlarmCount)
              indivGrab += "/"+"AlarmFrames >=:" +  ld.minAlarmCount;
            indivGrab += ".json?"+$rootScope.authSession;
            NVR.debug("Monitor " + $scope.MontageMonitors[i].Monitor.Id + ":" + $scope.MontageMonitors[i].Monitor.Name + " does not have events, trying " + indivGrab);
            var p = getExpandedEvents(i, indivGrab);
            promises.push(p);

          }

        }
        $q.all(promises).then(function () {
            $scope.isScreenReady = true;
            $timeout(function () {
              doPackery();
            });

          }

        )
        .catch (noop);

        // At this stage, we have both a general events grab, and specific event grabs for MIDS that were empty

        function doPackery() {
          // $ionicLoading.hide();
          //console.log("REDOING PACKERY & DRAG");
          NVR.debug("Re-creating packery and draggy");

          // remove current draggies
          if (draggies)
            draggies.forEach(function (drag) {
              drag.destroy();
            });
          draggies = [];
          // destroy existing packery object
          if (pckry) pckry.destroy();
          initPackery();

          $interval.cancel($rootScope.eventQueryInterval);
          $rootScope.eventQueryInterval = $interval(function () {
            checkAllEvents();
          }.bind(this), zm.eventHistoryTimer);

        }
      }, function (err) {
        NVR.debug("history  ERROR:" + JSON.stringify(err));
      });

      function getExpandedEvents(i, indivGrab) {
        var d = $q.defer();
        var ld = NVR.getLogin();
        // console.log ("Expanded API: " + indivGrab);
        $http({
          method: 'get',
          url: indivGrab
        }).then(function (succ) {
            var data = succ.data;
             //console.log ("EXPANDED DATA FOR MONITOR " + i + JSON.stringify(data));
            if (data.events.length > 0) {
              if (!NVR.isBackground()) {
                var bw = NVR.getBandwidth() == "lowbw" ? zm.eventMontageQualityLowBW : ld.montageHistoryQuality;
                var eType = data.events[0].Event.DefaultVideo != ''? 'video':'jpeg';

                var eid =  data.events[0].Event.Id;

                if (eType=='video') {
                  var videoURL= $scope.MontageMonitors[i].Monitor.baseURL  + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + eid;

                  videoURL += $rootScope.authSession;
                  if ($rootScope.basicAuthToken) videoURL = videoURL + "&basicauth=" + $rootScope.basicAuthToken;

          
                  $scope.MontageMonitors[i].Monitor.videoObject = {
                    config: {
                      autoPlay: true,
                      responsive: false,
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
                }
                $scope.MontageMonitors[i].Monitor.eventType = eType;
                $scope.MontageMonitors[i].Monitor.eventUrl = $scope.MontageMonitors[i].Monitor.streamingURL + "/nph-zms?source=event&mode=jpeg&event=" + data.events[0].Event.Id + "&frame=1&replay=gapless&rate=" + $scope.sliderVal.realRate + "&connkey=" + $scope.MontageMonitors[i].Monitor.connKey + "&scale=" + bw + $rootScope.authSession;
                //console.log ("SWITCHING TO " + $scope.MontageMonitors[i].eventUrl);
                $scope.MontageMonitors[i].Monitor.eventUrlTime = data.events[0].Event.StartTime;
                $scope.MontageMonitors[i].Monitor.eid = data.events[0].Event.Id;
                $scope.MontageMonitors[i].Monitor.noGraph = true;
                $scope.MontageMonitors[i].Monitor.sliderProgress = {
                  progress: 0
                };
                $scope.MontageMonitors[i].Monitor.eventDuration = data.events[0].Event.Length;
                //console.log(">>> Setting Event for " + $scope.MontageMonitors[i].Monitor.Name + " to " + data.events[0].Event.Id);
                NVR.log("Found expanded event " + data.events[0].Event.Id + " for monitor " + $scope.MontageMonitors[i].Monitor.Id);
              } else {
                // $scope.MontageMonitors[i].eventUrl="img/noimage.png";
                //    $scope.MontageMonitors[i].eventUrlTime = "";
                //    NVR.log ("Setting img src to null as data received in background");
              }
            }
            d.resolve(true);

            return d.promise;

          },
          function (err) {
            d.resolve(true);

            return d.promise;

          }

        );
        return d.promise;
      }

    } // getNextHistory


  }