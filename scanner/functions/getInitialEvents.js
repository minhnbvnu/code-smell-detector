function getInitialEvents() {

      var d = $q.defer();
      NVR.debug("getInitialEvents called");
      var lData = NVR.getLogin();
      loadMoreTime = Date.now();


      // If you came from Monitors, disregard hidden monitors in montage
      /* if (lData.persistMontageOrder && stackState != "Monitors") {
           var tempMon = message;
           $scope.monitors = NVR.applyMontageMonitorPrefs(tempMon, 2)[0];
       } else*/
      $scope.monitors = message;
      currEventsPage = 1;
      maxEventsPage = 1;
      pageLoaded = false;
      $scope.navTitle = "";
      moreEvents = true;

      if ($scope.monitors.length == 0) {
        var pTitle = $translate.instant('kNoMonitors');
        $ionicPopup.alert({
          title: pTitle,
          template: "{{'kCheckCredentials' | translate }}",
          okText: $translate.instant('kButtonOk'),
          cancelText: $translate.instant('kButtonCancel'),
        });
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go("app.login", {
          "wizard": false
        });
        d.resolve(true);
        return d.promise;
      }

      $scope.events = [];

      // First get total pages and then
      // start from the latest. If this fails, nothing displays

      NVR.debug("EventCtrl: grabbing # of event pages");
      nolangFrom = "";
      nolangTo = "";
      if ($rootScope.fromString)
        nolangFrom = moment($rootScope.fromString).locale('en').format("YYYY-MM-DD HH:mm:ss");
      if ($rootScope.toString)
        nolangTo = moment($rootScope.toString).locale('en').format("YYYY-MM-DD HH:mm:ss");

      //NVR.debug ("GETTING EVENTS USING "+$scope.id+" "+nolangFrom+" "+ nolangTo);


      NVR.debug("EventCtrl: grabbing events for: id=" + $scope.id + " Date/Time:" + $rootScope.fromString +
        "-" + $rootScope.toString);
      nolangFrom = "";
      nolangTo = "";
      if ($rootScope.fromString)
        nolangFrom = moment($rootScope.fromString).locale('en').format("YYYY-MM-DD HH:mm:ss");
      if ($rootScope.toString)
        nolangTo = moment($rootScope.toString).locale('en').format("YYYY-MM-DD HH:mm:ss");

      if ($scope.id) {
        $rootScope.monitorsFilter = "/MonitorId =:" + $scope.id;
        $scope.id = 0;
      }

        if ($rootScope.monitorsFilter != undefined && $rootScope.monitorsFilter != '') {
          NVR.debug("dorefresh monitorsFilter: " + $rootScope.monitorsFilter);
          var monitorIds = [];
          ($rootScope.monitorsFilter.split("/")).forEach(function(monitorId, index) {
            //console.log('Index: ' + index + ' Value: ' + monitorId);
            //skip the first one as it's always blank
            if (index)
              monitorIds.push(monitorId.split(":")[1]);
          });
          var checked = true;
          //if include listed monitors
          if ($rootScope.monitorsFilter.includes("!=")) {
            checked = false;
          }
          for (var i=0; i < $scope.monitors.length; i++) {
            if ($scope.monitors[i] != undefined) {
                if (monitorIds.includes($scope.monitors[i].Monitor.Id))
                    $scope.monitors[i].Monitor.isChecked = checked;
                else
                    $scope.monitors[i].Monitor.isChecked = !checked;
            }
          }
        }

 

      setRowHeight();

      NVR.getEvents($scope.id, currEventsPage, "", nolangFrom, nolangTo, false, $rootScope.monitorsFilter)
        .then(function (data) {

          pageLoaded = true;
          //$scope.viewTitle.title = data.pagination.count;

         // console.log(JSON.stringify(data.pagination));
          if (data.pagination && data.pagination.pageCount)
            maxEventsPage = data.pagination.pageCount;

          NVR.debug("We have a total of " + maxEventsPage + " and are at page=" + currEventsPage);

          // console.log ("WE GOT EVENTS="+JSON.stringify(data));
          var myevents = data.events;

          NVR.debug("EventCtrl: success, got " + myevents.length + " events");
          var loginData = NVR.getLogin();

          //console.log ("-------->MON LEN"+$scope.monitors.length);

          for (var i = 0; i < myevents.length; i++) {

            var idfound = true;
            if (loginData.persistMontageOrder) {
              idfound = false;
              for (var ii = 0; ii < $scope.monitors.length; ii++) {
                if ($scope.monitors[ii].Monitor.Id == myevents[i].Event.MonitorId && (NVR.isNotHidden(myevents[i].Event.MonitorId) || showHiddenMonitors)) {
                  // console.log ("FOUND IT");

                  idfound = true;
                  break;
                }
              }
            }

            //console.log ("IDFOUND="+idfound + " AND MON LEN="+$scope.monitors.length);

            myevents[i].Event.humanizeTime = humanizeTime(myevents[i].Event.StartTime);
            myevents[i].Event.streamingURL = NVR.getStreamingURL(myevents[i].Event.MonitorId);
            myevents[i].Event.recordingURL = NVR.getRecordingURL(myevents[i].Event.MonitorId);
            myevents[i].Event.imageMode = NVR.getImageMode(myevents[i].Event.MonitorId);

            //console.log ("***** MULTISERVER STREAMING URL FOR EVENTS " + myevents[i].Event.streamingURL);

            // console.log ("***** MULTISERVER BASE URL FOR EVENTS " + myevents[i].Event.recordingURL);

            myevents[i].Event.MonitorName = NVR.getMonitorName(myevents[i].Event.MonitorId);
            myevents[i].Event.ShowScrub = false;
            myevents[i].Event.rowHeight = getRowHeight(myevents[i]);
            // now construct base path
        

            // get thumbW/H

            var tempMon = NVR.getMonitorObject(myevents[i].Event.MonitorId);
            if (tempMon != undefined) {

              var mw = parseInt(tempMon.Monitor.Width);
              var mh = parseInt(tempMon.Monitor.Height);

              var mo = parseInt(tempMon.Monitor.Orientation);
              myevents[i].Event.Rotation = '';

              var th = computeThumbnailSize(mw, mh, mo);
              myevents[i].Event.thumbWidth = th.w;
              myevents[i].Event.thumbHeight = th.h;
            }

            // in multiserver BasePath is login url for frames 
            // http://login.url/index.php?view=frame&eid=19696772&fid=21

            //  console.log ("COMPARING "+NVR.getLogin().url+ " TO " +myevents[i].Event.recordingURL);
          

          
              myevents[i].Event.videoPath = myevents[i].Event.recordingURL + "/index.php?mode=mpeg&format=h264&view=view_video&eid=" + myevents[i].Event.Id;

            // if (idfound)
            if (idfound) {

              //NVR.debug ("PUSHING "+JSON.stringify(myevents[i]));
              $scope.events.push(myevents[i]);
              //console.log ("SCOPE EVENTS LEN="+$scope.events.length);
            } else {
              //NVR.debug ("Skipping Event MID = " + myevents[i].Event.MonitorId);
            }

          } //for

          //$scope.events = myevents;
          // we only need to stop the template from loading when the list is empty
          // so this can be false once we have _some_ content
          // FIXME: check reload
          $scope.eventsBeingLoaded = false;
          // to avoid only few events being displayed
          // if last page has less events
          //console.log("**Loading Next Page ***");
          if (myevents.length < maxEventsToLoad) {
            //console.log ("EVENTS LOADED="+JSON.stringify($scope.events));
            NVR.debug("EventCtrl:loading one more page just in case we don't have enough to display");
            loadMore()
            .then (function () {
              d.resolve(true);
              return d.promise;
            });

          } else {
              d.resolve(true);
              return d.promise;
          }
        });
        return (d.promise);
    }