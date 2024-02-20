function handleClose(event) {
      isSocketReady = false;
      pendingMessages = [];
      authState = connState.PENDING;

      if (iClosed) {
        NVR.debug("EventServer: App closed socket, not reconnecting");
        iClosed = false;
        return;
      }

     // console.log("*********** WEBSOCKET CLOSE CALLED");

      if (!NVR.getLogin().isUseEventServer) return;

      if (!isTimerOn) {
        NVR.log("EventServer: Will try to reconnect in 10 sec..");
        $timeout(init, 10000);
        isTimerOn = true;
      }
    }