function handleOpen(data) {
      isSocketReady = true;
      NVR.debug("EventServer: WebSocket open called with:" + JSON.stringify(data));
      var loginData = NVR.getLogin();
      NVR.log("EventServer: openHandshake: Websocket open, sending Auth");
      sendMessage("auth", {
        user: loginData.username,
        password: loginData.password,
        monlist: loginData.eventServerMonitors,
        intlist: loginData.eventServerInterval
      });

      if ($rootScope.apnsToken != '') {
       // var plat = $ionicPlatform.is('ios') ? 'ios' : 'android';
        var ld = NVR.getLogin();
        var pushstate = ld.disablePush == true ? "disabled" : "enabled";

        NVR.debug("EventServer: openHandShake: state of push is " + pushstate);
        // let's do this only if disabled. If enabled, I suppose registration
        // will be called?
        //if (ld.disablePush)
        //console.log ("HANDSHAKE MESSAGE WITH "+$rootScope.monstring);

        sendMessage("push", {
          type: 'token',
          platform: $rootScope.platformOS,
          token: $rootScope.apnsToken,
          monlist: $rootScope.monstring,
          intlist: $rootScope.intstring,
          state: pushstate
        });
      }
    }