function disconnect() {
      authState = connState.PENDING;
      pendingMessages = [];
      isSocketReady = false;

      NVR.log("EventServer: Clearing error/close cbk, disconnecting and deleting Event Server socket...");

      if ($rootScope.platformOS == 'desktop') {
        if (typeof ws === 'undefined') {
          NVR.log("EventServer: Event server socket is empty, nothing to disconnect");
          return;
        }

        ws.onmessage = null;
        iClosed = true;
        ws.close();
        ws = undefined;
      } else {
        if (nativeWebSocketId != -1) //native;
        {
          NVR.debug ("EventServer: Closing native websocket as websocket = "+nativeWebSocketId);
          iClosed = true;
          CordovaWebsocketPlugin.wsClose(nativeWebSocketId, 1000, "Connection closed");
          nativeWebSocketId = -1;
        }
      }
    }