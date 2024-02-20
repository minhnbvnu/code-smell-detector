function subControlStream(cmd, connkey) {
    var loginData = NVR.getLogin();
    
    var data_payload = {
      view: "request",
      request: "stream",
      connkey: connkey,
      command: cmd
    };

    if ($rootScope.authSession.indexOf("&auth=")!=-1) {
      data_payload.auth=$rootScope.authSession.match(/&auth=([^&]*)/)[1];
    }
    else if ($rootScope.authSession.indexOf("&token=")!=-1) {
      data_payload.token=$rootScope.authSession.match(/&token=([^&]*)/)[1];
    }

    //&auth=
    var req = qHttp({
      method: 'POST',
      /*timeout: 15000,*/
      url: loginData.url + '/index.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //'Accept': '*/*',
      },
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj) str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        var foo = str.join("&");
        //console.log("****HISTORY CONTROL RETURNING " + foo);
        return foo;
      },
      data: data_payload
    });
    req.then(function (succ) {
      NVR.debug("subControl success:" + JSON.stringify(succ));
    }, function (err) {
      NVR.debug("subControl error:" + JSON.stringify(err));
    });
  }