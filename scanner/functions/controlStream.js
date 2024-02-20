function controlStream(cmd, disp, connkey, ndx) {
    // console.log("Command value " + cmd);

    if (disp) {
      $ionicLoading.hide();
      $ionicLoading.show({
        template: $translate.instant('kPleaseWait') + '...',
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
    var CMD_QUIT = 17;
    var CMD_QUERY = 99;
    */

   // var myauthtoken='';

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

    var req = $http({
      method: 'POST',
      /*timeout: 15000,*/
      url: loginData.url + '/index.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Accept': '*/*',
      },
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj)
          str.push(encodeURIComponent(p) + "=" +
            encodeURIComponent(obj[p]));
        var foo = str.join("&");
        //console.log("****CONTROL RETURNING " + foo);
        return foo;
      },

      data: data_payload
    });
    req.then(function (resp) {

        resp = resp.data;
        if (resp.result == "Ok" && ndx != -1) {
          var ld = NVR.getLogin();
          var apiurl = ld.apiurl + "/events/" + resp.status.event + ".json?"+$rootScope.authSession;
          //console.log ("API " + apiurl);
          $http.get(apiurl)
            .then(function (data) {
                data = data.data;
                if ($scope.MontageMonitors[ndx].eventUrlTime != data.event.Event.StartTime) {

                  var element = angular.element(document.getElementById($scope.MontageMonitors[ndx].Monitor.Id + "-timeline"));
                  element.removeClass('animated slideInRight');
                  element.addClass('animated slideOutRight');
                  $timeout(function () {
                    element.removeClass('animated slideOutRight');
                    element.addClass('animated slideInRight');
                    $scope.MontageMonitors[ndx].eventUrlTime = data.event.Event.StartTime;
                  }, 300);

                }

              },
              function (data) {
                $scope.MontageMonitors[ndx].eventUrlTime = "-";
              });

        }

      },

      function (resp) {
        //console.log("ERROR: " + JSON.stringify(resp));
        NVR.log("Error sending event command " + JSON.stringify(resp), "error");
      });


  }