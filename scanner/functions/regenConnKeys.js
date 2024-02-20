function regenConnKeys(mon) {
        var nowt = moment();
        if (mon) {
          var newConnKey = genConnKey();
          debug("NVR: Regenerating connkey for Monitor:"+mon.Monitor.Id+" at "+nowt+" old "+mon.Monitor.connKey+" new "+newConnKey);
          mon.Monitor.connKey = newConnKey;
          mon.Monitor.regenTime = nowt;
          if (mon.Monitor.regenHandle) {
            //debug ("cancelling regen timer for Monitor:"+mon.Monitor.Id);
            $timeout.cancel(mon.Monitor.regenHandle);
            mon.Monitor.regenHandle = null;
          }
        } else {
          debug("NVR: Regenerating connkeys for all monitors at "+nowt);
          for (var i = 0; i < monitors.length; i++) {
            monitors[i].Monitor.connKey = genConnKey();
            monitors[i].Monitor.rndKey = (Math.floor((Math.random() * 999999) + 1)).toString();
            monitors[i].Monitor.regenTime = nowt;
            if (monitors[i].Monitor.regenHandle) {
              $timeout.cancel(monitors[i].Monitor.regenHandle);
              monitors[i].Monitor.regenHandle = null;
            }
          }
        }
      }