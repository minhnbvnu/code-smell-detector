function timerProgress(unit, value, total){

  if (timerIntervals.length > 0) {
    if (total < timerIntervals[0]) {

      ts = $('#timerSection');

      // clear all classes except for the one sizing the container
      ts.attr('class', 'open');

      // remove all the intervals we've already passed
      timerIntervals = timerIntervals.filter(function(val) { return val < total });

      switch(timerIntervals.length) {
        case 3:   ts.addClass('intervalHalf');      break;
        case 2:   ts.addClass('intervalQuarter');   break;
        case 1:   ts.addClass('intervalWarning');   break;
        case 0:
          ts.addClass('intervalCritical');
          $("#timerDisplay").TimeCircles({circle_bg_color: "red"});

          // when timing short durations, sometimes the last interval doesn't get triggered until we end.
          if( $("#timerDisplay").TimeCircles().getTime() <= 0 ) {
            endTimer();
          }
          break;
      }
    }
  }
  else {
    endTimer();
  }
}