function sendMessage(type, obj, isForce) {

      obj.appversion = NVR.getAppVersion();
      var msg = {
        'event': type,
        'data': obj,
        'token': $rootScope.apnsToken
      };

      var jmsg = JSON.stringify(msg);
      NVR.debug("EventServer: sendMessage: received->" + jmsg);

      var ld = NVR.getLogin();
      if (ld.isUseEventServer == false && isForce != 1) {
        NVR.debug("EventServer: Not sending WSS message as event server is off");
        return;
      }

      if (typeof ws === 'undefined' && nativeWebSocketId == -1) {
        NVR.debug("EventServer: not initalized, not sending message");
        return;
      }

      if (isSocketReady == false) {
        NVR.debug("EventServer: Connection not yet ready, adding message to queue");
        pendingMessages.push ({type:type, obj:obj});
        return;
      }

      if (($rootScope.platformOS != 'desktop') && (!$rootScope.apnsToken) ) {
        NVR.debug('Mobile platform does not have a token yet, adding message to queue');
        pendingMessages.push ({type:type, obj:obj});
        return;
      }

      if (authState == connState.REJECT && type != 'auth') {
        NVR.debug("EventServer: ERROR: ES rejected authentication, not sending message");
        return;
      }

      if (authState == connState.PENDING && type != 'auth') {
        NVR.debug("EventServer: Connection not yet authenticated, adding message to queue");
        pendingMessages.push ({type:type, obj:obj});
        return;
      }
      // console.log (">>>>>>>>>>>>>>>>>EVENT SERVER SENDING: type="+type+" DATA="+JSON.stringify(obj));

      NVR.debug("EventServer: ok to send message");
  
      if ($rootScope.platformOS == 'desktop') {
        try {
          ws.send(jmsg);
        }
        catch (e)  {
          NVR.debug ("EventServer: Exception sending ES message: "+JSON.stringify(e));
        }
      } else {
        if (nativeWebSocketId != -1)
          CordovaWebsocketPlugin.wsSend(nativeWebSocketId, jmsg);
        else
          NVR.debug("EventServer: ERROR:native websocket not initialized, can't send " + jmsg);
      }
    }