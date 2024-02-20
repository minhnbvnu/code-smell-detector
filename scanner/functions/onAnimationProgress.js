function onAnimationProgress(event) {
        event.stopPropagation();
        var ev = event.originalEvent || event;

        // we now always use `Date.now()` due to the recent changes with
        // event.timeStamp in Firefox, Webkit and Chrome (see #13494 for more info)
        var timeStamp = ev.$manualTimeStamp || Date.now();

        /* Firefox (or possibly just Gecko) likes to not round values up
         * when a ms measurement is used for the animation */
        var elapsedTime = parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));

        /* $manualTimeStamp is a mocked timeStamp value which is set
         * within browserTrigger(). This is only here so that tests can
         * mock animations properly. Real events fallback to event.timeStamp,
         * or, if they don't, then a timeStamp is automatically created for them.
         * We're checking to see if the timeStamp surpasses the expected delay,
         * but we're using elapsedTime instead of the timeStamp on the 2nd
         * pre-condition since animationPauseds sometimes close off early */
        if (Math.max(timeStamp - startTime, 0) >= maxDelayTime && elapsedTime >= maxDuration) {
          // we set this flag to ensure that if the transition is paused then, when resumed,
          // the animation will automatically close itself since transitions cannot be paused.
          animationCompleted = true;
          close();
        }
      }