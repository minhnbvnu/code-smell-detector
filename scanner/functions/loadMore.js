function loadMore() {
      // the events API does not return an error for anything
      // except greater page limits than reported


      var d = $q.defer();



      if ((currEventsPage >= maxEventsPage) && (pageLoaded)) {
        moreEvents = false;
        NVR.debug("No more - We have a total of " + maxEventsPage + " and are at page=" + currEventsPage);

       // console.log("*** At Page " + currEventsPage + " of " + maxEventsPage + ", not proceeding");
        $ionicLoading.hide();
        d.resolve(true);
        return d.promise;
      }

      currEventsPage++;
      if (!enableLoadMore) {
        $ionicLoading.hide();
        moreEvents = false; // Don't ion-scroll till enableLoadMore is true;
        $scope.$broadcast('scroll.infiniteScrollComplete');

        // console.log("**** LOADMORE ARTIFICALLY DISABLED");
        d.resolve(true);
        return d.promise;
      }

      var loadingStr = "";
      if ($scope.search.text != "") {
    
        var toastStr = $translate.instant('kPleaseWait') +'...'+ currEventsPage;
       // console.log ("SHOW " + toastStr );
        $ionicLoading.show({
          maxwidth: 100,
          noBackdrop:true,
          scope: $scope,
          template: toastStr,
          //template: '<button class="button button-clear icon-left ion-close-circled button-text-wrap" ng-click="cancelSearch()" >' + toastStr + '</button>'
        });

        loadingStr = "none";
      }

      nolangFrom = "";
      nolangTo = "";
      if ($rootScope.fromString)
        nolangFrom = moment($rootScope.fromString).locale('en').format("YYYY-MM-DD HH:mm:ss");
      if ($rootScope.toString)
        nolangTo = moment($rootScope.toString).locale('en').format("YYYY-MM-DD HH:mm:ss");

      NVR.getEvents($scope.id, currEventsPage, loadingStr, nolangFrom, nolangTo, false,$rootScope.monitorsFilter)
        .then(function (data) {
            var loginData = NVR.getLogin();
            // console.log("Got new page of events with Page=" + eventsPage);
            var myevents = data.events;


            for (var i = 0; i < myevents.length; i++) {

              var idfound = true;
              var ld = NVR.getLogin();

              if (ld.persistMontageOrder) {
                idfound = false;
                for (var ii = 0; ii < $scope.monitors.length; ii++) {
                  if ($scope.monitors[ii].Monitor.Id == myevents[i].Event.MonitorId && (NVR.isNotHidden(myevents[i].Event.MonitorId) || showHiddenMonitors)) {

                    //console.log ( $scope.monitors[ii].Monitor.Id + " MATCHES " + myevents[i].Event.MonitorId);
                    idfound = true;

                    break;
                  }
                }
              }

              myevents[i].Event.humanizeTime = humanizeTime(myevents[i].Event.StartTime);
              myevents[i].Event.MonitorName = NVR.getMonitorName(myevents[i].Event.MonitorId);
              // now construct base path

              myevents[i].Event.streamingURL = NVR.getStreamingURL(myevents[i].Event.MonitorId);
              myevents[i].Event.recordingURL = NVR.getRecordingURL(myevents[i].Event.MonitorId);
              myevents[i].Event.imageMode = NVR.getImageMode(myevents[i].Event.MonitorId);
              // console.log ("***** MULTISERVER STREAMING URL FOR EVENTS " + myevents[i].Event.streamingURL);

              //  console.log ("***** MULTISERVER BASE URL FOR EVENTS " + myevents[i].Event.recordingURL);
              myevents[i].Event.rowHeight = getRowHeight(myevents[i]);
              myevents[i].Event.ShowScrub = false;


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


            
                myevents[i].Event.videoPath = myevents[i].Event.recordingURL + "/index.php?view=view_video&mode=mpeg&format=h264&eid=" + myevents[i].Event.Id;

              if (idfound) $scope.events.push(myevents[i]);
            }

            //console.log("Got new page of events");
            moreEvents = true;
            $scope.$broadcast('scroll.infiniteScrollComplete');
            d.resolve(true);
            return d.promise;
          },

          function (error) {
            // console.log("*** No More Events to Load, Stop Infinite Scroll ****");
            moreEvents = false;
            $ionicLoading.hide();
            $scope.$broadcast('scroll.infiniteScrollComplete');
            d.resolve(true);
            return (d.promise);
          });
          return d.promise;
    }