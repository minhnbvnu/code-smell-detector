function getAlarmStatus(monitor) {
      var apiurl = NVR.getLogin().apiurl;
      //console.log ("ALARM CALLED WITH " +JSON.stringify(monitor));

      var alarmurl = apiurl + "/monitors/alarm/id:" + monitor.Monitor.Id + "/command:status.json?"+$rootScope.authSession;
      //  console.log("Alarm Check: Invoking " + alarmurl);

      $http.get(alarmurl)
        .then(function (data) {
          //  NVR.debug ("Success in monitor alarmed status " + JSON.stringify(data));

          var sid = parseInt(data.data.status);
          switch (sid) {
            case 0: // idle
              monitor.Monitor.alarmState = 'rgba(0,0,0,0)';
              break;
            case 1: // pre alarm
              monitor.Monitor.alarmState = '#e67e22';
              break;
            case 2: // alarm
              monitor.Monitor.alarmState = '#D91E18';
              break;
            case 3: // alert
              monitor.Monitor.alarmState = '#e67e22';
              break;
            case 4:
              monitor.Monitor.alarmState = '#26A65B';
              break;
          }
        },
          function (error) {
            monitor.Monitor.alarmState = 'rgba(0,0,0,0)';
            NVR.debug("Error in monitor alarmed status ");
          });
    }