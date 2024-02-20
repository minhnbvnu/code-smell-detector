function controlEventStream(cmd, disp, connkey, ndx, extras) {
    // console.log("Command value " + cmd);

    var d = $q.defer();
    if (disp) {
      $ionicLoading.hide();
      $ionicLoading.show({
        template: $translate.instant('kPleaseWait') + "...",
        noBackdrop: true,
        duration: zm.loadingTimeout,
      });
    }
    var loginData = NVR.getLogin();
    /*
    var CMD_NONE = 0;
    var CMD_PAUSE = 1;
    var CMD_PLAY = 2;
    var CMD_STOP = 3;
    var CMD_FASTFWD = 4;
    var CMD_SLOWFWD = 5;
    var CMD_SLOWREV = 6;
    var CMD_FASTREV = 7;
    var CMD_ZOOMIN = 8;
    var CMD_ZOOMOUT = 9;
    var CMD_PAN = 10;
    var CMD_SCALE = 11;
    var CMD_PREV = 12;
    var CMD_NEXT = 13;
    var CMD_SEEK = 14;
    var CMD_QUERY = 99;
    */
    // You need to POST commands to control zms
    // Note that I am url encoding the parameters into the URL
    // If I leave it as JSON, it gets converted to OPTONS due
    // to CORS behaviour and ZM/Apache don't seem to handle it
    //console.log("POST: " + loginData.url + '/index.php');
    //console.log ("AUTH IS " + $rootScope.authSession);
    var myauthtoken = $rootScope.authSession.replace("&auth=", "");
    //&auth=

    var cmdUrl = loginData.url + '/index.php?view=request&request=stream'+'&connkey='+connkey+'&command='+cmd+$rootScope.authSession;
    if (extras)
      cmdUrl = cmdUrl+extras;

    NVR.debug ("Control: Sending "+cmdUrl);

    var req = $http({
      method: 'GET',
      url:cmdUrl
    });
    
   
    req.then(function (succ) {
      var resp = succ.data;

      //console.log ("zms response: " + JSON.stringify(resp));

      // move progress bar if event id is the same
      if (resp.result == "Ok" && ndx != -1 && (resp.status && resp.status.event == $scope.MontageMonitors[ndx].Monitor.eid)) {
        if (!$scope.MontageMonitors[ndx].Monitor.seek) {
          $scope.MontageMonitors[ndx].Monitor.sliderProgress.progress = resp.status.progress;
        } else {
          NVR.debug("Skipping progress as seek is active for " + $scope.MontageMonitors[ndx].Monitor.Name);
        }
      }

      if (resp.result == "Ok" && resp.status &&  ndx != -1 && ((resp.status.event != $scope.MontageMonitors[ndx].Monitor.eid) || $scope.MontageMonitors[ndx].Monitor.noGraph == true)) {
        $scope.MontageMonitors[ndx].Monitor.noGraph = false;
        // $scope.MontageMonitors[ndx].Monitor.sliderProgress.progress = 0;
        NVR.debug("Fetching details, as event changed for " + $scope.MontageMonitors[ndx].Monitor.Name + " from " + $scope.MontageMonitors[ndx].Monitor.eid + " to " + resp.status.event);
        var ld = NVR.getLogin();
        var apiurl = ld.apiurl + "/events/" + resp.status.event + ".json?"+$rootScope.authSession;
        //console.log ("API " + apiurl);
        qHttp({
          method: 'get',
          url: apiurl
        }).then(function (succ) {
          var data = succ.data;
          var currentEventTime = moment(data.event.Event.StartTime);
          var maxTime = moment();
          //NVR.debug ("Monitor: " + $scope.MontageMonitors[ndx].Monitor.Id + " max time="+maxTime + "("+$scope.datetimeValueTo.value+")"+ " current="+currentEventTime + "("+data.event.Event.StartTime+")");

          NVR.debug("creating graph for " + $scope.MontageMonitors[ndx].Monitor.Name);
          var framearray = {
            labels: [],
            datasets: [{
              backgroundColor: 'rgba(242, 12, 12, 0.5)',
              borderColor: 'rgba(242, 12, 12, 0.5)',
              data: [],
            }]
          };
          framearray.labels = [];
          var ld = NVR.getLogin();
          //console.log(">>>>> GRAPH");
          for (i = 0; i < data.event.Frame.length; i++) {
            var ts = moment(data.event.Frame[i].TimeStamp).format(timeFormat);
            //console.log ("pushing s:" + event.Frame[i].Score+" t:"+ts);
            framearray.datasets[0].data.push({
              x: ts,
              y: data.event.Frame[i].Score
            });
            framearray.labels.push("");
          }
          $timeout(function () {
            drawGraph(framearray, $scope.MontageMonitors[ndx].Monitor.Id);
          }, 100);
          var element = angular.element(document.getElementById($scope.MontageMonitors[ndx].Monitor.Id + "-timeline"));
          element.removeClass('animated fadeIn');
          element.addClass('animated fadeOut');
          $timeout(function () {
            element.removeClass('animated fadeOut');
            element.addClass('animated fadeIn');
            $scope.MontageMonitors[ndx].Monitor.eventUrlTime = data.event.Event.StartTime;
            var bw = NVR.getBandwidth() == "lowbw" ? zm.eventMontageQualityLowBW : ld.montageHistoryQuality;

            // you don't have to change url - its taken care of in cmd?

            // $scope.MontageMonitors[ndx].Monitor.eventUrl = $scope.MontageMonitors[ndx].Monitor.streamingURL + "/nph-zms?source=event&mode=jpeg&event=" + data.event.Event.Id + "&frame=1&replay=gapless&rate=" + $scope.sliderVal.realRate + "&connkey=" + $scope.MontageMonitors[ndx].Monitor.connKey + "&scale=" + bw + $rootScope.authSession;
            $scope.MontageMonitors[ndx].Monitor.eid = data.event.Event.Id;
            $scope.MontageMonitors[ndx].Monitor.sliderProgress = {
              progress: 0
            };
            $scope.MontageMonitors[ndx].Monitor.eventDuration = data.event.Event.Length;
            //console.log(">>> Setting Event for " + $scope.MontageMonitors[ndx].Monitor.Name + " to " + data.event.Event.Id);
          }, 700);

        }, function (err) {
          NVR.debug("skipping graph as detailed API failed for " + $scope.MontageMonitors[ndx].Monitor.Name);
          $scope.MontageMonitors[ndx].Monitor.eventUrlTime = "-";
        });
      }
      d.resolve(true);
      return d.promise;
    }, function (err) {
      d.reject(false);
      NVR.log("Error sending event command " + JSON.stringify(err), "error");
      return d.promise;
    });
    return d.promise;
  }