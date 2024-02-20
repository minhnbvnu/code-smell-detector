function getEventStatus(monitor, showMontageSidebars) {
      var ld = NVR.getLogin();

      //  https:///zm/api/events/index/MonitorId=:2.json?sort=StartTime&direction=desc&limit=1

      var apiurl = ld.apiurl +'/events/index'; // we need some interval or it errors
      apiurl += "/"+"MonitorId =:" + monitor.Monitor.Id;
      if (monitor.Monitor.Id in ld.lastEventCheckTimes) {
        // now is server TZ time
        var now = ld.lastEventCheckTimes[monitor.Monitor.Id];
        apiurl += "/StartTime >:" + now;
      }

      if (ld.enableAlarmCount && ld.minAlarmCount)
        apiurl += "/"+"AlarmFrames >=:" + ld.minAlarmCount;
      if (ld.objectDetectionFilter) {
        apiurl +='/'+'Notes REGEXP:detected:';
      }

      /*if ( !(monitor.Monitor.Id in ld.lastEventCheckTimes)) {
            apiurl+= '/1 month';
            NVR.debug ("No last time found for monitor:"+monitor.Monitor.Id+" assuming 1 month" )
        } else {
            var now = new moment();
            var dur = moment.duration(now.diff(ld.lastEventCheckTimes[monitor.Monitor.Id]));
            var interval = Math.floor(dur.asHours()) + moment.utc(dur.asMilliseconds()).format("-mm-ss");
            NVR.debug ("Monitor "+monitor.Monitor.Id+" was last accessed "+interval+" ago");

            apiurl += '/\'' + interval + '\' HOUR_SECOND';
        }*/

      apiurl  += '.json?sort=StartTime&direction=desc&limit=1'+$rootScope.authSession;

      //NVR.debug ("Getting event count ");
      $http.get(apiurl)
        .then (function (data) {
          // console.log ("EVENTS GOT: "+JSON.stringify(data));
          var res = data.data;
          var mid = monitor.Monitor.Id;
          if (!res || !res.events) res = undefined;
          else if (res.events.length == 0) res = undefined;

          monitor.Monitor.lastEvent = res;

          if (monitor.Monitor.lastEvent) {
            var notes = res.events[0].Event.Notes;
            if (notes.indexOf('detected:') != -1) {
              monitor.Monitor.lastEvent.object = true;
            } else {
              monitor.Monitor.lastEvent.object = false;
            }
          }

          if (monitor.Monitor.lastEvent && showMontageSidebars) {
            if (ld.objectDetectionFilter) {
              if (monitor.Monitor.lastEvent.object)  {
                monitor.Monitor.showSidebar = true;
              }
            } else {
              monitor.Monitor.showSidebar = true;
            }
          }
        },
          function (err) {
            NVR.debug("event status load failed: "+JSON.stringify(err));
          });
    }