function detectWake() {
        var TIMEOUT = 10000;
        var iter = 1;
        var lastTime = (new Date()).getTime();

        setInterval(function() {
          var currentTime = (new Date()).getTime();
          if (currentTime > (lastTime + TIMEOUT + 10000)) {
            // Wake!
            $rootScope.online = false;
            NVR.log ("********* YOU WOKE UP!!!!!");
            onOnline();
            iter = 1;
          } else {
            //NVR.debug ("alive..."+iter);
            iter++;
          }
          lastTime = currentTime;
        }, TIMEOUT);
      }