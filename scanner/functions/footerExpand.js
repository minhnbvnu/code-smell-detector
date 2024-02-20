function footerExpand() {
      //https://server/zm/api/events/consoleEvents/5%20minute.json
      var ld = NVR.getLogin();

      var af="";
      if (ld.enableAlarmCount && ld.minAlarmCount )
        af = "/AlarmFrames >=:" + ld.minAlarmCount ;

      if (ld.objectDetectionFilter) {
        af = af + '/'+'Notes REGEXP:detected:';
      }

      var apiurl = ld.apiurl + "/events/consoleEvents/1 hour" + af + ".json?"+$rootScope.authSession;
      //NVR.debug("consoleEvents API:" + apiurl);

      $http.get(apiurl)
        .then(function (data) {
          data = data.data;
         // NVR.debug(JSON.stringify(data));  
          $scope.hours = [];
          var p = data.results;
          for (var key in data.results) {

            if (p.hasOwnProperty(key)) {

              var idfound = true;
              //console.log ("PERSIST IS " + ld.persistMontageOrder);
              if (ld.persistMontageOrder) {
                idfound = false;
                for (var ii = 0; ii < $scope.monitors.length; ii++) {
                  if ($scope.monitors[ii].Monitor.Id == key && (NVR.isNotHidden(key) || showHiddenMonitors)) {
                    // console.log ("Authorizing "+$scope.monitors[ii].Monitor.Name);
                    idfound = true;
                    break;
                  }
                }
              }
              //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
              if (idfound)
                $scope.hours.push({
                  monitor: NVR.getMonitorName(key),
                  events: p[key],
                  mid: key
                });

            }
          }
        });

      apiurl = ld.apiurl + "/events/consoleEvents/1 day" + af + ".json?"+$rootScope.authSession;
      //NVR.debug("consoleEvents API:" + apiurl);
      $http.get(apiurl)
        .then(function (data) {
          data = data.data;
          //NVR.debug(JSON.stringify(data));
          $scope.days = [];
          var p = data.results;
          for (var key in data.results) {
            if (p.hasOwnProperty(key)) {
              var idfound = true;
              if (ld.persistMontageOrder) {
                idfound = false;
                for (var ii = 0; ii < $scope.monitors.length; ii++) {
                  if ($scope.monitors[ii].Monitor.Id == key && (NVR.isNotHidden(key) || showHiddenMonitors)) {
                    idfound = true;
                    break;
                  }
                }
              }
              //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
              if (idfound)
                //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
                $scope.days.push({
                  monitor: NVR.getMonitorName(key),
                  events: p[key],
                  mid: key
                });

            }
          }
        });

      apiurl = ld.apiurl + "/events/consoleEvents/1 week" + af + ".json?"+$rootScope.authSession;
      //NVR.debug("consoleEvents API:" + apiurl);
      $http.get(apiurl)
        .then(function (data) {
          data = data.data;
         // NVR.debug(JSON.stringify(data));
          $scope.weeks = [];
          var p = data.results;
          for (var key in data.results) {
            if (p.hasOwnProperty(key)) {

              var idfound = true;
              if (ld.persistMontageOrder) {
                idfound = false;
                for (var ii = 0; ii < $scope.monitors.length; ii++) {
                  if ($scope.monitors[ii].Monitor.Id == key && (NVR.isNotHidden(key) || showHiddenMonitors)) {
                    idfound = true;
                    break;
                  }
                }
              }
              //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
              if (idfound)
                //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
                $scope.weeks.push({
                  monitor: NVR.getMonitorName(key),
                  events: p[key],
                  mid: key
                });

            }
          }
        });

      apiurl = ld.apiurl + "/events/consoleEvents/1 month" + af + ".json?"+$rootScope.authSession;
      //NVR.debug("consoleEvents API:" + apiurl);
      $http.get(apiurl)
        .then(function (data) {
          data = data.data;
          //NVR.debug(JSON.stringify(data));
          $scope.months = [];
          var p = data.results;
          for (var key in data.results) {
            if (p.hasOwnProperty(key)) {

              var idfound = true;
              var ld = NVR.getLogin();
              if (ld.persistMontageOrder) {
                idfound = false;
                for (var ii = 0; ii < $scope.monitors.length; ii++) {
                  if ($scope.monitors[ii].Monitor.Id == key && (NVR.isNotHidden(key) || showHiddenMonitors)) {
                    idfound = true;
                    break;
                  }
                }
              }
              //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
              if (idfound)
                //console.log(NVR.getMonitorName(key) + " -> " + p[key]);
                $scope.months.push({
                  monitor: NVR.getMonitorName(key),
                  events: p[key],
                  mid: key
                });

            }
          }
        });

    }