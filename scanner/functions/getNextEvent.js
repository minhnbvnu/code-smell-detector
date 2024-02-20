function getNextEvent(eid,dirn) {

    var d = $q.defer();
    // now get event details to show alarm frames
    var loginData = NVR.getLogin();
    var myurl = loginData.apiurl + '/events/' + eid + ".json?"+$rootScope.authSession;
    //console.log (">> 1: getting: "+myurl);

    var r = {
      eid:"",
      stime:""
    };

    $http.get(myurl)
    .then( function (succ) {
      //console.log (JSON.stringify(succ));
      var target = (dirn == -1) ? succ.data.event.Event.PrevOfMonitor: succ.data.event.Event.NextOfMonitor;
      //console.log (">> 2: dirn: "+dirn+" target: "+target);
      if (!target) target = 'null'; // fallback incase in some API this doesn't exist;
      if (target == 'null') {
        r.eid = "-1";
        r.stime = "-1";
        d.resolve(r);
        return d.promise;
      }
      else {
        r.eid = target;
        // now get time of that event
        myurl = loginData.apiurl+'/events/'+target + '.json?'+$rootScope.authSession;
        $http.get (myurl)
        .then (function (succ) {
            r.stime = succ.data.event.Event.StartTime;
            d.resolve(r);
            return d.promise;
        },function (err) {
          NVR.debug ("Error getting start time of neighbor:"+JSON.stringify(err));
           r.stime = "-1";
           d.resolve(r);
           return d.promise;
        });
        return d.promise;
      }
    }, function (err) {
        NVR.debug ("Error getting neighbors:"+JSON.stringify(err));
        r.eid = "-1";
        r.stime = "-1";
        d.resolve(r);
        return d.promise;

    });
    return (d.promise);

  }