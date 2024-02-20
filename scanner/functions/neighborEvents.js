function neighborEvents(eid, mid) {

    var neighbors = {
      prev: "",
      next: ""
    };
    // prev https://zm/api/events/index/StartTime <: 2018-05-05 11:50:00 =:7/AlarmFrames >=:1.json?sort=StartTime&direction=desc&limit=1

    //next
    //zm/api/events/index/StartTime >: 2018-05-05 11:50:00/MonitorId =:7/AlarmFrames >=:1.json?sort=StartTime&direction=asc&limit=1

    var d = $q.defer();
    // now get event details to show alarm frames
    var loginData = NVR.getLogin();
    var nextEvent = loginData.apiurl + "/events/index" +
      "/StartTime >:" + currentEvent.Event.StartTime +
      ($scope.followSameMonitor == '1' ? "/"+"MonitorId =:" + currentEvent.Monitor.Id : "") ;
      if ($scope.useFilters) {
        if (loginData.enableAlarmCount && loginData.minAlarmCount)
          nextEvent = nextEvent + "/"+"AlarmFrames >=:" + loginData.minAlarmCount;
      }

      if ($rootScope.monitorsFilter != undefined && $rootScope.monitorsFilter != '') {
        nextEvent = nextEvent  + $rootScope.monitorsFilter;
      }

      nextEvent = nextEvent + ".json?sort=StartTime&direction=asc&limit=1"+$rootScope.authSession;


    var prevEvent = loginData.apiurl + "/events/index" +
      "/"+"StartTime <:" + currentEvent.Event.StartTime +
      ($scope.followSameMonitor == '1' ? "/"+"MonitorId =:"+ currentEvent.Monitor.Id : "");

      if ($scope.useFilters) {
        if (loginData.enableAlarmCount && loginData.minAlarmCount)
          prevEvent = prevEvent + "/"+"AlarmFrames >=:" + loginData.minAlarmCount;
      }

      if ($rootScope.monitorsFilter != undefined && $rootScope.monitorsFilter != '') {
        prevEvent = prevEvent  + $rootScope.monitorsFilter;
      }

      prevEvent = prevEvent + ".json?sort=StartTime&direction=desc&limit=1"+$rootScope.authSession;


    //console.log ("FILTER IS "+$rootScope.monitorsFilter);
    NVR.debug("Neighbor next URL=" + nextEvent);
    NVR.debug("Neighbor pre URL=" + prevEvent);

    var nextPromise = $http.get(nextEvent);
    var prePromise = $http.get(prevEvent);

    var preId = "";
    var nextId = "";

    $q.all([nextPromise, prePromise])
      .then(function (data) {

        // console.log ("NEXT OBJ="+JSON.stringify(data[0]));
        // console.log ("PRE OBJ="+JSON.stringify(data[1]));
        // next
        if (data[0] && data[0].data && data[0].data.events.length > 0) {
          nextId = data[0].data.events[0].Event.Id;

        }

        if (data[1] && data[1].data && data[1].data.events.length > 0) {
          preId = data[1].data.events[0].Event.Id;

        }
        NVR.debug("neighbors of " + currentEvent.Event.Id + "are pre=" + preId + " next=" + nextId);
        neighbors.next = nextId;
        neighbors.prev = preId;
        d.resolve(neighbors);
        return d.promise;


        // prev
        //  console.log ("NEXT:",JSON.stringify(data[0].data),"PREV:",JSON.stringify(data[1].data));
      }, function (error) {
        NVR.log("Error retrieving neighbors" + JSON.stringify(error));
        d.reject(neighbors);
        return (d.promise);

      })
      .catch (noop);

    return (d.promise);

  }