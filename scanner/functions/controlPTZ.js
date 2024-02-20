function controlPTZ(monitorId, cmd) {

    //presetGotoX
    //presetHome
    //curl -X POST "http://server.com/zm/index.php?view=request" -d
    //"request=control&user=admin&passwd=xx&id=4&control=moveConLeft"

    if ($scope.ptzMoveCommand == "undefined") {
      $ionicLoading.show({
        template: $translate.instant('kPTZNotReady'),
        noBackdrop: true,
        duration: 2000,
      });
      return;
    }

    var ptzData = "";
    if (cmd.lastIndexOf("preset", 0) === 0) {
      NVR.debug("PTZ command is a preset, so skipping xge/lge");
      ptzData = {
        view: "request",
        request: "control",
        id: monitorId,
        control: cmd,
        //  xge: "30", //wtf
        //  yge: "30", //wtf
      };

    } else {

      ptzData = {
        view: "request",
        request: "control",
        id: monitorId,
        control: cmd,
        xge: "30", //wtf
        yge: "30", //wtf
      };
    }

    if ($rootScope.authSession.indexOf("&token=")!=-1) {
      ptzData.token=$rootScope.authSession.match(/&token=([^&]*)/)[1];
    }


    //console.log("Command value " + cmd + " with MID=" + monitorId);
    //console.log("PTZDATA is " + JSON.stringify(ptzData));
    $ionicLoading.hide();
    $ionicLoading.show({
      template: $translate.instant('kPleaseWait') + "...",
      noBackdrop: true,
      duration: zm.loadingTimeout,
    });

    var loginData = NVR.getLogin();
    $ionicLoading.hide();
    $ionicLoading.show({
      template: $translate.instant('kSendingPTZ') + "...",
      noBackdrop: true,
      duration: zm.loadingTimeout,
    });

    var req = $http({
      method: 'POST',
      /*timeout: 15000,*/
      url: loginData.url + '/index.php',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      transformRequest: function (obj) {
        var str = [];
        for (var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        var foo = str.join("&");
        //console.log("****PTZ RETURNING " + foo);
        return foo;
      },

      data: ptzData
    });

    req.then(function (resp) {
        //console.log("SUCCESS: " + JSON.stringify(resp));
        $ionicLoading.hide();

      },
      function (resp) {
        $ionicLoading.hide();
        //console.log("ERROR: " + JSON.stringify(resp));
        NVR.log("Error sending PTZ:" + JSON.stringify(resp), "error");
      });


  }