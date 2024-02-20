function loadEvents(data) {
        var loginData = NVR.getLogin();
        var myevents = data.events;
        NVR.debug("EventCtrl:loadEvents() myevents.length: " + myevents.length + ", currEventsPage: " + currEventsPage + ", currentPagePosition: " + currentPagePosition);
        
        if (data.events.length == 0) {
            NVR.debug("EventCtrl:loadEvents() no events so we must have reached the end.");
            moreEvents = false;
            $ionicLoading.hide();
            currEventsPage++;
            return;
        }

        //console.log ("-------->MON LEN"+$scope.monitors.length);
        currentPageLength = myevents.length;
        var eventsLoaded = 0;
        var prevPagePosition = currentPagePosition;
        NVR.debug("maxEventsToLoad: " + maxEventsToLoad);
        for (currentPagePosition; currentPagePosition < myevents.length && eventsLoaded < maxEventsToLoad; currentPagePosition++) {
            var idfound = true;
            if (loginData.persistMontageOrder) {
              idfound = false;
              for (var i = 0; i < $scope.monitors.length; i++) {
                if ($scope.monitors[i].Monitor.Id == myevents[currentPagePosition].Event.MonitorId && (NVR.isNotHidden(myevents[currentPagePosition].Event.MonitorId) || showHiddenMonitors)) {
                  // console.log ("FOUND IT");

                    //console.log ( $scope.monitors[i].Monitor.Id + " MATCHES " + myevents[currentPagePosition].Event.MonitorId);
                  idfound = true;
                  break;
                }
              }
            }

            //console.log ("IDFOUND="+idfound + " AND MON LEN="+$scope.monitors.length);

            myevents[currentPagePosition].Event.humanizeTime = humanizeTime(myevents[currentPagePosition].Event.StartTime);
            myevents[currentPagePosition].Event.streamingURL = NVR.getStreamingURL(myevents[currentPagePosition].Event.MonitorId);
            myevents[currentPagePosition].Event.recordingURL = NVR.getRecordingURL(myevents[currentPagePosition].Event.MonitorId);
            myevents[currentPagePosition].Event.imageMode = NVR.getImageMode(myevents[currentPagePosition].Event.MonitorId);

            // console.log ("***** MULTISERVER STREAMING URL FOR EVENTS " + myevents[currentPagePosition].Event.streamingURL);
            // console.log ("***** MULTISERVER BASE URL FOR EVENTS " + myevents[currentPagePosition].Event.recordingURL);

            myevents[currentPagePosition].Event.MonitorName = NVR.getMonitorName(myevents[currentPagePosition].Event.MonitorId);
            myevents[currentPagePosition].Event.ShowScrub = false;
            myevents[currentPagePosition].Event.rowHeight = getRowHeight(myevents[currentPagePosition]);

            //myevents[currentPagePosition].Event.height = eventsListDetailsHeight;
            // now construct base path

            // get thumbW/H
            var tempMon = NVR.getMonitorObject(myevents[currentPagePosition].Event.MonitorId);
            if (tempMon != undefined) {
              var mw = parseInt(tempMon.Monitor.Width);
              var mh = parseInt(tempMon.Monitor.Height);
              var mo = parseInt(tempMon.Monitor.Orientation);
              myevents[currentPagePosition].Event.Rotation = '';

              var th = computeThumbnailSize(mw, mh, mo);
              myevents[currentPagePosition].Event.thumbWidth = th.w;
              myevents[currentPagePosition].Event.thumbHeight = th.h;
             // console.log ("************* RH:"+myevents[currentPagePosition].Event.rowHeight);
            }

            // in multiserver BasePath is login url for frames 
            // http://login.url/index.php?view=frame&eid=19696772&fid=21

            //  console.log ("COMPARING "+NVR.getLogin().url+ " TO " +myevents[currentPagePosition].Event.recordingURL);

          myevents[currentPagePosition].Event.videoPath = myevents[currentPagePosition].Event.recordingURL + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + myevents[currentPagePosition].Event.Id;

            // if (idfound)
            if (idfound) {

              //NVR.debug ("PUSHING "+JSON.stringify(myevents[currentPagePosition]));
              $scope.events.push(myevents[currentPagePosition]);
              eventsLoaded++;
              //console.log ("SCOPE EVENTS LEN="+$scope.events.length);
            } else {
              //NVR.debug ("Skipping Event MID = " + myevents[currentPagePosition].Event.MonitorId);
            }

        } //for
        
        NVR.debug("EventCtrl:loadEvents() Events added to view: " + (currentPagePosition - prevPagePosition));
    }