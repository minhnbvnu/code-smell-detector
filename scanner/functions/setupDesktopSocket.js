function setupDesktopSocket() {
      var loginData = NVR.getLogin();
      var d = $q.defer();
      ws = new WebSocket(loginData.eventServer);

      ws.onopen = function (event) {
        handleOpen(event.data);
        if (!pushInited) {
          NVR.debug("Initializing FCM push");
          pushInit();
        }
        d.resolve("true");
        return d.promise;
      };

      ws.onclose = function (event) {
        handleClose(event);
        d.reject("error");
        return d.promise;
      };

      ws.onerror = function (event) {
        handleError(event);
        d.reject("error");
        return d.promise;
      };

      ws.onmessage = function (event) {
        var smsg = event.data;
        handleMessage(smsg);
      };

      return d.promise;
    }