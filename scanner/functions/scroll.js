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