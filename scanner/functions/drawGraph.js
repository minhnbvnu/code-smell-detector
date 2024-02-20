function drawGraph(fromDate, toDate, count) {

    // console.log("INSIDE DRAW");

    $scope.newEvents = "";
    // we only need this for day mode
    $interval.cancel(updateInterval);

    curFromDate = fromDate;
    curToDate = toDate;
    curCount = count;

    var isFirstItem = true;

    var fromDateNoLang = moment(fromDate).locale('en').format("YYYY-MM-DD HH:mm:ss");
    var toDateNoLang = moment(toDate).locale('en').format("YYYY-MM-DD HH:mm:ss");

    //latestDateDrawn =toDateNoLang;

    $ionicLoading.show({
      template: $translate.instant('kLoadingGraph') + "...",
      animation: 'fade-in',
      showBackdrop: false,
      maxWidth: 200,
      showDelay: 0,
      duration: zm.loadingTimeout, //specifically for Android - http seems to get stuck at times
    });

    NVR.log("TimelineCtrl/drawgraph: from->" + fromDateNoLang + " to->" + toDateNoLang + " count:" + count);
    $scope.graphLoaded = false;
    NVR.debug("TimelineCtrl/drawgraph: graphLoaded:" + $scope.graphLoaded);

    if (timeline_instance) {
      NVR.debug("TimelineCtrl/drawgraph: destroying timeline_instance as it exists");
      timeline_instance.destroy();
    }

    groups = new vis.DataSet();
    graphData = new vis.DataSet();
    //console.log ("AFTER VIS");

    var tzs, tze;

    // lets scope the time graph to either local or remote time zone

    if (NVR.getLogin().useLocalTimeZone) {
      tzs = moment.tz(fromDate, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
      tze = moment.tz(toDate, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
    } else {
      tzs = moment.tz(fromDate, NVR.getTimeZoneNow());
      tze = moment.tz(toDate, NVR.getTimeZoneNow());
    }

    //tzs = tzs.format("YYYY-MM-DD HH:mm:ss");
    //tze = tze.format("YYYY-MM-DD HH:mm:ss");

   // var th = Math.round( window.height() * 0.85 ) + 'px';
     options = {

      showCurrentTime: true,
      editable: false,
     verticalScroll: true,
     //height: '100%',
     //maxHeight:"80%",
     maxHeight:$rootScope.devHeight-100,
     //zoomKey: 'ctrlKey',

     //groupHeightMode:'fixed',
     //height:$rootScope.devHeight - 10,
     
     moment: function (date) {

        //var t;
        if (NVR.getLogin().useLocalTimeZone)
          //if (0)
          return moment.tz(date, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
        else
          // typecast to server time zone - its in server time anyway
          return moment.tz(date, NVR.getTimeZoneNow());
      },
      //throttleRedraw: 100,

      
      moveable: true,
     // height:100,
      zoomable: true,
      selectable: true,
     // multiselect: true,
      start: tzs,
      end: tze,
      orientation: 'top',
      min: tzs,
      max: tze,
      zoomMin: 5 * 60 * 1000, // 1 min
      stack: false,

      format: {
        minorLabels: {
          minute: NVR.getTimeFormat(),
          hour: NVR.getTimeFormat(),
          second: 's',
        },
        majorLabels: {
          second: "D MMM " + NVR.getTimeFormat(),
        }
      },

    };


  
    graphIndex = 1; // will be used for graph ID

    //console.log ("**NOLANG" + fromDateNoLang  + " " + toDateNoLang);

    NVR.getEventsPages(0, fromDateNoLang, toDateNoLang, true)
      .then(function (epData) {
        var pages = 1;
        var itemsPerPage = parseInt(epData.limit);
        var iterCount;

        // So iterCount is the # of HTTP calls I need to make
        iterCount = Math.max(Math.round(count / itemsPerPage), 1);
        NVR.debug("TimelineCtrl/drawGraph: pages of data: " + pages + " items per page: " + itemsPerPage);
        NVR.debug("TimelineCtrl/drawGraph: I will make " + iterCount + " HTTP Requests to get all graph data");

        // I've restructured this part. I was initially using vis DataSets
        // for dynamic binding which was easier, but due to performance reasons
        // I am waiting for the full data to load before I draw
        var promises = [];
        while ((pages <= epData.pageCount) && (iterCount > 0)) {
          var promise = NVR.getEvents(0, pages, "none", fromDateNoLang, toDateNoLang, true, $rootScope.monitorsFilter);
          promises.push(promise);

          pages++;
          iterCount--;

        }

        $q.all(promises)
          .then(function (data) {
              NVR.debug("TimelineCtrl/drawgraph: all pages of graph data received ");
              graphIndex = 0;
              NVR.log("Creating " + $scope.monitors.length + " groups for the graph");
              // create groups
              for (var g = 0; g < $scope.monitors.length; g++) {
                groups.add({
                  id: $scope.monitors[g].Monitor.Id,
                  //mid: $scope.monitors[g].Monitor.Id,
                  content: NVR.getMonitorName($scope.monitors[g].Monitor.Id),
                  order: $scope.monitors[g].Monitor.Sequence
                });
                NVR.debug("TimelineCtrl/drawgraph:Adding group " +
                  NVR.getMonitorName($scope.monitors[g].Monitor.Id));
              }

              for (var j = 0; j < data.length; j++) {
                var myevents = data[j].events;


                //   console.log ("****************DATA ="+JSON.stringify(data[j]));
                // console.log ("**********************************");
                if (graphIndex > count) {
                  NVR.log("Exiting page count graph - reached limit of " + count);
                  break;

                }

                for (var i = 0; i < myevents.length; i++) {

                  // make sure group id exists before adding
                  var idfound = true;
                  var ld = NVR.getLogin();

                  // skip non detections here because we can't query to DB due to page attribute
                  if (ld.objectDetectionFilter && myevents[i].Event.Notes.indexOf('detected:') == -1) {
                    continue;
                  }

                  if (ld.persistMontageOrder) {

                    idfound = false;
                    for (var ii = 0; ii < $scope.monitors.length; ii++) {
                      if ($scope.monitors[ii].Monitor.Id == myevents[i].Event.MonitorId && NVR.isNotHidden(myevents[i].Event.MonitorId)) {
                        idfound = true;
                        //console.log ("****************** ID MATCH " + graphIndex);

                        break;
                      }
                    }
                  }

                  myevents[i].Event.MonitorName = NVR.getMonitorName(myevents[i].Event.MonitorId);
                  // now construct base path

                  myevents[i].Event.streamingURL = NVR.getStreamingURL(myevents[i].Event.MonitorId);
                  myevents[i].Event.recordingURL = NVR.getRecordingURL(myevents[i].Event.MonitorId);
                  myevents[i].Event.imageMode = NVR.getImageMode(myevents[i].Event.MonitorId);
                  if (NVR.getLogin().url != myevents[i].Event.recordingURL) {
                    //NVR.debug ("Multi server, changing base");
                    myevents[i].Event.recordingURL = NVR.getLogin().url;

                  }
               

                  if (idfound) {

                    if (typeof myevents[i].Event.DefaultVideo === 'undefined')
                      // console.log (JSON.stringify(myevents[i]));
                      myevents[i].Event.DefaultVideo = "";

                    //console.log ("ADDING "+myevents[i].Event.StartTime+"->"+myevents[i].Event.EndTime);

                    var tzs, tze;
                    if (NVR.getLogin().useLocalTimeZone) {
                      tzs = moment.tz(myevents[i].Event.StartTime, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
                      tze = moment.tz(myevents[i].Event.EndTime, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
                    } else {
                      tzs = moment.tz(myevents[i].Event.StartTime, NVR.getTimeZoneNow());
                      tze = moment.tz(myevents[i].Event.EndTime, NVR.getTimeZoneNow());
                    }

                    //console.log ("ADDED "+tzs+" " +tze);

                    if (!graphData.get(myevents[i].Event.Id)) {
                      graphData.add({
                        //id: graphIndex,
                        id: myevents[i].Event.Id,
                        content: "<span class='my-vis-font'>" + "( <i class='ion-android-notifications'></i>" + myevents[i].Event.AlarmFrames + ") " + "(" + myevents[i].Event.Id + ") " + myevents[i].Event.Notes + "</span>",

                        start: tzs,
                        //start: myevents[i].Event.StartTime,
                        //end: myevents[i].Event.EndTime,
                        end: tze,
                        group: myevents[i].Event.MonitorId,
                        //type: "range",
                        style: "background-color:" + colors[parseInt(myevents[i].Event.MonitorId) % colors.length] +
                          ";border-color:" + colors[parseInt(myevents[i].Event.MonitorId) % colors.length],
                        myframes: myevents[i].Event.Frames,
                        mydur: myevents[i].Event.Length,
                        myeid: myevents[i].Event.Id,
                        myename: myevents[i].Event.Name,
                        myvideo: myevents[i].Event.DefaultVideo,
                        myevent: myevents[i]

                      });
                      //console.log ("IED="+myevents[i].Event.Id);
                      graphIndex++;
                    }
                  } else {
                    //console.log ("SKIPPED GRAPH ID " + graphIndex);
                  }

                  if (graphIndex > count) {
                    NVR.log("Exiting event graph - reached limit of " + count);
                    break;

                  }

                }
              }

      
              //options = {};
              console.log(">>>>> CREATING NEW TIMELINE ");
              timeline_instance = new vis.Timeline(container[0]);
              console.log ("OPTIONS DATA:"+ JSON.stringify(options));
              timeline_instance.setOptions(options);
              console.log ("GRAPH DATA:"+ JSON.stringify(graphData));
              timeline_instance.setItems(graphData);
              console.log ("GROUPS");
              timeline_instance.setGroups(groups);
              timeline_instance.fit();

              

              lastTimeForEvent = moment().tz(NVR.getLogin().useLocalTimeZone ? NVR.getLocalTimeZoneNow() : NVR.getTimeZoneNow());
              updateInterval = $interval(function () {
                processNewEvents();
              }.bind(this), 10 * 1000);

              $ionicLoading.hide();
              $scope.graphLoaded = true;
              NVR.debug("graph loaded: " + $scope.graphLoaded);
              $scope.navControls = false;
             

          
               
              timeline_instance.on('rangechanged', function (s) {
                ///console.log ("Range Changed:"+JSON.stringify(s));
                if (s.byUser) {

                  var w = timeline_instance.getWindow();
                  //console.log ("start:"+w.start+" end:"+w.end);
                  var a = moment(w.start);
                  var b = moment(w.end);
                  var d = b.diff(a, 'seconds');
                  var ld = NVR.getLogin();
                  ld.timelineScale = d;
                  NVR.setLogin(ld);
                }
              });

              // different handlers for mobile and desktop
              // due to how they seeem to react to touch differently

              NVR.debug ("setting up desktop handlers");
              timeline_instance.on('click', function (prop) {
                $timeout (function () {
                  var now = moment();
                  var diff = now.diff(lastClicked);
                  NVR.debug ('Touch Start called with ms since last clicked:'+diff);
                  lastClicked = now;
                  //NVR.debug ('lastClick set to:'+lastClicked);
                  if (diff <= 500) {
                      NVR.debug ("Double tap detected <= 500ms");
                      //timelineAnalyzeFrames(prop);
                      timelineShowEvent(prop);
                  }
                  // differntiate between dbl click and click
                  else {
                          NVR.debug ("single tap assumed (double tap timeout)");
                          timelineShowHover(prop);
    
                  }

                  });
                  
                });

                /*
                timeline_instance.on('doubleClick', function (prop) {
                    NVR.debug ("double click handler called");
                    timelineShowEvent(prop);   
                    //timelineAnalyzeFrames(prop);
                });*/
              
           
       

              // hover is only desktop
              if ($rootScope.platformOS == 'desktop') {
                timeline_instance.on('itemover', function (prop) {
                    timelineShowHover(prop);
                   });

                
              }
     
            },
            function (error) {
              NVR.displayBanner('error', 'Timeline error', 'Please try again');

            }

          )
          .catch (noop); // get Events
      });
  }