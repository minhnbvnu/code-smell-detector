function processNewEvents() {

    //safeguard in the event http calls are still going on
    if (!$scope.follow.time || isProcessNewEventsWaiting) return;

    var ld = NVR.getLogin();

    // check for last 2 minutes to account for late DB updates and what not. 5 mins was likely enough
    // 

    // make sure these are server time
    var from = moment(lastTimeForEvent).tz(NVR.getTimeZoneNow());
    from = from.subtract(2, 'minutes').locale('en').format("YYYY-MM-DD HH:mm:ss");

    var to = moment(lastTimeForEvent).tz(NVR.getTimeZoneNow());
    to = to.locale('en').format("YYYY-MM-DD HH:mm:ss");

    lastTimeForEvent = moment().tz(NVR.getLogin().useLocalTimeZone ? NVR.getLocalTimeZoneNow() : NVR.getTimeZoneNow());

    // FIXME: totally ignoring event pages - hoping it wont be more than 100 or 150 whatever
    // the events per page limit is. Why? laziness.
    // 
    var completedEvents = ld.apiurl + '/events/index/'+'EndTime >=:' + from;
    // we can add alarmCount as this is really for completed events
    if (ld.enableAlarmCount && ld.minAlarmCount)
      completedEvents = completedEvents + "/"+"AlarmFrames >=:" + ld.minAlarmCount;

    if (ld.objectDetectionFilter) {
      completedEvents = completedEvents + '/'+ 'Notes REGEXP:"detected:"';
    }

    completedEvents = completedEvents + ".json?"+$rootScope.authSession;

    // now get currently ongoing events
    // as it turns out various events get stored withn null and never recover
    // so, lets limiy to 15 m
    // 

    var st = moment(lastTimeForEvent).tz(NVR.getTimeZoneNow());
    st = st.subtract(10, 'minutes').locale('en').format("YYYY-MM-DD HH:mm:ss");
    var ongoingEvents = ld.apiurl + '/'+'events/index/StartTime >=:' + st + '/EndTime =:.json'+'?'+$rootScope.authSession;
    //NVR.debug("Getting incremental events using: " + completedEvents);

    NVR.debug("Completed events API:" + completedEvents);
    NVR.debug("Ongoing events API:+" + ongoingEvents);

    isProcessNewEventsWaiting = true;

    var $httpApi = $http.get(completedEvents);
    var $httpOngoing = $http.get(ongoingEvents);

    $q.all([$httpApi, $httpOngoing])
      .then(function (dataarray) {

          var myevents = dataarray[0].data.events;

          if (dataarray.length > 1) {
            myevents = myevents.concat(dataarray[1].data.events);

          }

          $scope.newEvents = '';
          var localNewEvents = '';
          //console.log ("GOT "+JSON.stringify(data));

          for (var j = 0; j < myevents.length; j++) {

            // these are all in server timezone but no TZ

            myevents[j].Event.StartTime = moment.tz(myevents[j].Event.StartTime, NVR.getTimeZoneNow()).format('YYYY-MM-DD HH:mm:ss');

            myevents[j].Event.EndTime = moment.tz(myevents[j].Event.EndTime, NVR.getTimeZoneNow()).format('YYYY-MM-DD HH:mm:ss');

            var itm = graphData.get(myevents[j].Event.Id);
            if (itm) {
              // console.log(myevents[j].Event.Id + " already exists, updating params");

              var content = "<span class='my-vis-font'>" + "(" + myevents[j].Event.Id + ")" + myevents[j].Event.Notes + " " + $translate.instant('kRecordingProgress') + "</span>";

              var style;
              var recordingInProgress = false;

              if (moment(myevents[j].Event.EndTime).isValid()) // recording over
              {
                //console.log ("EVENT "+myevents[j].Event.Id+" emded at "+myevents[j].Event.EndTime);

                content = "<span class='my-vis-font'>" + "( <i class='ion-android-notifications'></i>" + myevents[j].Event.AlarmFrames + ") " + " (" + myevents[j].Event.Id + ") " + myevents[j].Event.Notes + "</span>";

                style = "background-color:" + colors[parseInt(myevents[j].Event.MonitorId) % colors.length] +
                  ";border-color:" + colors[parseInt(myevents[j].Event.MonitorId) % colors.length];
              } else // still recording
              {

                var tze;
                tze = moment().tz(NVR.getTimeZoneNow());

                myevents[j].Event.EndTime = tze.format('YYYY-MM-DD HH:mm:ss');

                //console.log ("END TIME = "+ myevents[j].Event.EndTime);

                style = "background-color:orange";
                recordingInProgress = true;

              }

              // right at this point we need to decide if we keep or remove this event
              // 

              if (ld.enableAlarmCount && ld.minAlarmCount > myevents[j].Event.AlarmFrames && !recordingInProgress) {
                // remove
                NVR.debug("Removing Event:" + myevents[j].Event.Id + "as it doesn't have " + myevents[j].Event.AlarmFrames + " alarm frames");
                // var old = timeline_instance.getWindow();
                graphData.remove(myevents[j].Event.Id);
                //   timeline_instance.setWindow (old.start, old.end);
              } else {

                var tzs1, tze1;
                if (NVR.getLogin().useLocalTimeZone) {
                  tzs1 = moment.tz(myevents[j].Event.StartTime, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
                  tze1 = moment.tz(myevents[j].Event.EndTime, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
                } else {
                  tzs1 = moment.tz(myevents[j].Event.StartTime, NVR.getTimeZoneNow());
                  tze1 = moment.tz(myevents[j].Event.EndTime, NVR.getTimeZoneNow());
                }

                //tzs1 = tzs1.format("YYYY-MM-DD HH:mm:ss");
                //tze1 = tze1.format("YYYY-MM-DD HH:mm:ss");

                NVR.debug("Updating Event:" + myevents[j].Event.Id + "StartTime:" + tzs1.format() + " EndTime:" + tze1.format());
                graphData.update({
                  id: myevents[j].Event.Id,
                  content: content,
                  start: tzs1,
                  // start: myevents[j].Event.StartTime,
                  // end: myevents[j].Event.EndTime,
                  end: tze1,
                  //group: myevents[j].Event.MonitorId,
                  //type: "range",
                  style: style,
                  myframes: myevents[j].Event.Frames,
                  mydur: myevents[j].Event.Length,
                  myeid: myevents[j].Event.Id,
                  myename: myevents[j].Event.Name,
                  myvideo: myevents[j].Event.DefaultVideo,
                  myevent: myevents[j]

                });

                //timeline_instance.focus(myevents[j].Event.Id);
                //
                timeline_instance.moveTo(timeline_instance.getCurrentTime());
                //console.log ("Focus EID="+myevents[j].Event.Id);
                localNewEvents = localNewEvents + NVR.getMonitorName(myevents[j].Event.MonitorId) + '@' + shortenTime(myevents[j].Event.StartTime) + ' (' + myevents[j].Event.Id + '),';

              }

            } else { // event is new

              var isBeingRecorded = false;
              var idfound = false;
              for (var ii = 0; ii < $scope.monitors.length; ii++) {
                if ($scope.monitors[ii].Monitor.Id == myevents[j].Event.MonitorId && NVR.isNotHidden(myevents[j].Event.MonitorId)) {
                  idfound = true;
                  break;
                }
              }

              if (idfound) {

                myevents[j].Event.MonitorName = NVR.getMonitorName(myevents[j].Event.MonitorId);

                myevents[j].Event.streamingURL = NVR.getStreamingURL(myevents[j].Event.MonitorId);
                myevents[j].Event.recordingURL = NVR.getRecordingURL(myevents[j].Event.MonitorId);
                myevents[j].Event.imageMode = NVR.getImageMode(myevents[j].Event.MonitorId);
                if (NVR.getLogin().url != myevents[j].Event.recordingURL) {

                  myevents[j].Event.recordingURL = NVR.getLogin().url;
                }

                if (typeof myevents[j].Event.DefaultVideo === 'undefined')
                  // console.log (JSON.stringify(myevents[j]));
                  myevents[j].Event.DefaultVideo = "";

                // now lets make sure we don't infinitely increase

                if (graphIndex >= curCount)
                //if (1)
                {
                  var mv = graphData.min('id');
                  //console.log("MIN="+JSON.stringify(mv));
                  if (mv) {
                    graphData.remove(mv.id);
                    graphIndex--;
                    NVR.debug("Removed Event " + mv.id + " to make space");
                  }

                }

                // since this is a new add its possible dates are not defined
                if (!moment(myevents[j].Event.StartTime).isValid()) {
                  NVR.log("Event:" + myevents[j].Event.Id + "-Invalid Start time - this should really not happen ");

                }

                if (!moment(myevents[j].Event.EndTime).isValid()) {
                  var t1 = moment().tz(NVR.getTimeZoneNow());

                  myevents[j].Event.EndTime = t1.format('YYYY-MM-DD HH:mm:ss');

                  NVR.debug("Event:" + myevents[j].Event.Id + "-End time is invalid, setting to current time");

                  isBeingRecorded = true;

                }

                // if range doesn't allow for current time, we need to fix that
                /*if (moment(options.max).isBefore(moment())) {
                   // console.log("Adjusting Range to fit in new event");
                    options.max = moment().add('1', 'hours').locale('en').format("YYYY-MM-DD HH:mm:ss");
                    timeline_instance.setOptions(options);
                }*/

                var eventText = "<span class='my-vis-font'>" + "( <i class='ion-android-notifications'></i>" + (myevents[j].Event.AlarmFrames || ' unknown ') + ") " + myevents[j].Event.Notes + "</span>";

                if (isBeingRecorded) {
                  eventText = "<span class='my-vis-font'>" + "(" + myevents[j].Event.Id + ") " + myevents[j].Event.Notes + " " + $translate.instant('kRecordingProgress') + "</span>";
                }

                // since we concated, its possible events may be repeated
                if (!graphData.get(myevents[j].Event.Id)) {

                  localNewEvents = localNewEvents + NVR.getMonitorName(myevents[j].Event.MonitorId) + '@' + shortenTime(myevents[j].Event.StartTime) + ' (' + myevents[j].Event.Id + '),';

                  var tzs2, tze2;
                  if (NVR.getLogin().useLocalTimeZone) {
                    tzs2 = moment.tz(myevents[j].Event.StartTime, NVR.getTimeZoneNow()).tz(NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
                    tze2 = moment.tz(myevents[j].Event.EndTime, NVR.getTimeZoneNow()).tz(NVR.getLocalTimeZoneNow());
                  } else {
                    tzs2 = moment.tz(myevents[j].Event.StartTime, NVR.getTimeZoneNow());
                    tze2 = moment.tz(myevents[j].Event.EndTime, NVR.getTimeZoneNow());
                  }

                  //tzs2 = tzs2.format("YYYY-MM-DD HH:mm:ss");
                  //tze2 = tze2.format("YYYY-MM-DD HH:mm:ss");

                  NVR.debug(">>> " + myevents[j].Event.Id + " New event updating graph " + " from:" + tzs2.format() + " to:" + tze2.format());

                  graphData.add({

                    id: myevents[j].Event.Id,
                    content: eventText,
                    start: tzs2,
                    //start: myevents[j].Event.StartTime,
                    // end: myevents[j].Event.EndTime,
                    end: tze2,
                    group: myevents[j].Event.MonitorId,
                    style: "background-color:orange",
                    //type: "range",

                    myframes: myevents[j].Event.Frames,
                    mydur: myevents[j].Event.Length,
                    myeid: myevents[j].Event.Id,
                    myename: myevents[j].Event.Name,
                    myvideo: myevents[j].Event.DefaultVideo,
                    myevent: myevents[j]

                  });
                  graphIndex++;
                  //timeline_instance.focus(myevents[j].Event.Id);
                  timeline_instance.moveTo(timeline_instance.getCurrentTime());
                }

                //options.max = moment(fromDate).locale('en').format("YYYY-MM-DD HH:mm:ss");

              } //idfound

            } // new event

          } // for j

          // At this stage, see if we need to display new events
          if (localNewEvents.length > 0) {
            localNewEvents = $translate.instant('kLatestEvents') + ':' + localNewEvents;
            localNewEvents = localNewEvents.slice(0, -1);
            $scope.newEvents = localNewEvents;
          }
          isProcessNewEventsWaiting = false;

        },
        function (err) {
          NVR.debug("Error getting incremental timeline data");
          isProcessNewEventsWaiting = false;

        })
        .catch (noop);

    // check all events that started 10+10 seconds ago

  }