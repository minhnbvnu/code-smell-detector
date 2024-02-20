function startDownSpin() {
        stopSpin();

        spincount = 0;
        spinning = 'down';

        originalinput.trigger('touchspin.on.startspin');
        originalinput.trigger('touchspin.on.startdownspin');

        downDelayTimeout = setTimeout(function() {
          downSpinTimer = setInterval(function() {
            spincount++;
            downOnce();
          }, settings.stepinterval);
        }, settings.stepintervaldelay);
      }