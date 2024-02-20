function setupMobileSocket() {
      if (!pushInited) {
        NVR.debug("Calling pushInit()");
        pushInit();
      } else {
        NVR.debug("pushInit() already done");
      }

      var loginData = NVR.getLogin();
      var d = $q.defer();

      var wsOptions = {
        url: loginData.eventServer,
        acceptAllCerts: !loginData.enableStrictSSL
      };

      CordovaWebsocketPlugin.wsConnect(wsOptions,
        function (recvEvent) {
          //console.log("Received callback from WebSocket: " + recvEvent.callbackMethod);
          if (recvEvent.callbackMethod == 'onMessage') {
            handleMessage(recvEvent.message);
          } else if (recvEvent.callbackMethod == 'onClose') {
            handleClose();
          } else if (recvEvent.callbackMethod == 'onFail') {
            handleError();
          }
        },
        function (success) {
         // console.log("Connected to WebSocket with id: " + success.webSocketId);
          nativeWebSocketId = success.webSocketId;
          handleOpen(success);
          d.resolve(true);
          return d.promise;
        },
        function (error) {
          NVR.debug("EventServer: Failed to connect to WebSocket: " +
            "code: " + error.code +
            ", reason: " + error.reason +
            ", exception: " + error.exception);
          d.resolve(false);
          return d.promise;
        }
      );
      return d.promise;
    }