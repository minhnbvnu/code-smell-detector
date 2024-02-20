function getMoments(sortCondition, to) {
    $scope.uiReady = false;

    if (sortCondition == 'MaxScore') {
      $scope.type = $translate.instant('kMomentMenuByScore');
      $scope.typeIcon = "ion-arrow-graph-up-right";
    } else if (sortCondition == 'StartTime') {
      $scope.type = $translate.instant('kMomentMenuByTime');
      $scope.typeIcon = "ion-clock";
    } else if (sortCondition == 'monitorName') {
      $scope.type = $translate.instant('kMomentMenuByMonitor');
      $scope.typeIcon = "ion-ios-videocam";

    }

    $scope.apiurl = NVR.getLogin().apiurl;
    moments = [];

    NVR.setAwake(false);

    var tmptimeto, tmptimefrom;

    if (!to) { // assume current time
      tmptimeto = moment();
    } else {
      tmptimeto = moment(to);
    }


    tmptimefrom = angular.copy(tmptimeto);
    tmptimefrom.subtract(24, 'hours'); // mutable, hence deep copy above

    var page = 1;
    timeFrom = tmptimefrom.format('YYYY-MM-DD HH:mm:ss');
    timeTo = tmptimeto.format('YYYY-MM-DD HH:mm:ss');


    $scope.displayTimeFrom = moment(timeFrom).format("MMM DD," + NVR.getTimeFormat());
    $scope.displayTimeTo = moment(timeTo).format("MMM DD," + NVR.getTimeFormat());

    NVR.debug("Moments from " + timeFrom + " to " + timeTo);

    var ld = NVR.getLogin();

    // in API, always sort by StartTime so all monitors are represented
    var myurl = ld.apiurl + "/events/index/"+"AlarmFrames >=:1" + excludeMonitorsFilter + "/"+"StartTime <=:" + timeTo + "/"+"EndTime >=:" + timeFrom + ".json?sort=" + "StartTime" + "&direction=desc"+$rootScope.authSession;
    NVR.debug("Retrieving " + myurl);


    // very cool trick to parallel fork HTTP requests and not bork on errors. Basically, we catch errors and ignore
    // noop is a dummy function that does nothing
    // credit https://stackoverflow.com/a/20594522/1361529
    $q.all([
        $http.get(myurl + '&page=1').then(process).catch(noop),
        $http.get(myurl + '&page=2').then(process).catch(noop),
        $http.get(myurl + '&page=3').then(process).catch(noop),
        $http.get(myurl + '&page=4').then(process).catch(noop)

      ])
      .then(function () {
        NVR.debug("$q.all Parallel queries completed");

        if (!moments.length) {
          $scope.loadingStatus = $translate.instant('kMomentNoneFound');
        } else {
          NVR.debug ("We got a total of "+moments.length+" events");
        }

        // not really sure we need this
        // will see later
        if (sortCondition == "StartTime") {
         
          NVR.debug ("Sorting by start time");
          moments.sort(function (a, b) {
            var da = a.Event.dateObject;
            var db = b.Event.dateObject;
            //NVR.debug ("Comparing b="+db+ " to "+da);
            return db - da;
            //return da > db ? -1 : da < db ? 1 : 0;
          });
          
         /* sorted_eids=[];
          moments.forEach(function (m,i) {sorted_eids.push(m.Event.Id);});
          NVR.debug ("EIDs after sorting:"+sorted_eids);*/
        }

        // if we use any other condition, we need to first sort by cond and then time
        if (sortCondition != "StartTime") {
          var ascordesc = true;
          if (sortCondition == 'monitorName') ascordesc = false;

         
          moments = objSort(moments, [sortCondition, ascordesc], ["dateObject", true]);
        }

        
       
        $scope.moments = moments;

        $timeout (function() {
          $scope.uiReady=true;
          $timeout(function () {
            initMasonry();
          }, 300);
        },300);
        

      });




  }