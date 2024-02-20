function scrollTo(Y, duration, callback) {
      // scroll animation loop w/ easing
      // credit https://gist.github.com/dezinezync/5487119
      var start = Date.now(),
          from = lastOverscroll;

      if (from === Y) {
        callback();
        return; /* Prevent scrolling to the Y point if already there */
      }

      // decelerating to zero velocity
      function easeOutCubic(t) {
        return (--t) * t * t + 1;
      }

      // scroll loop
      function scroll() {
        var currentTime = Date.now(),
          time = Math.min(1, ((currentTime - start) / duration)),
          // where .5 would be 50% of time on a linear scale easedT gives a
          // fraction based on the easing method
          easedT = easeOutCubic(time);

        overscroll(Math.floor((easedT * (Y - from)) + from));

        if (time < 1) {
          ionic.requestAnimationFrame(scroll);

        } else {

          if (Y < 5 && Y > -5) {
            isOverscrolling = false;
            setScrollLock(false);
          }

          callback && callback();
        }
      }

      // start scroll loop
      ionic.requestAnimationFrame(scroll);
    }