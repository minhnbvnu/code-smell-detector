function animateScroll(Y, X) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        var start = Date.now(),
          duration = 250, //milliseconds
          fromY = self.el.scrollTop,
          fromX = self.el.scrollLeft;

        if (fromY === Y && fromX === X) {
          self.el.style.overflowX = oldOverflowX;
          self.el.style.overflowY = oldOverflowY;
          self.resize();
          return; /* Prevent scrolling to the Y point if already there */
        }

        // decelerating to zero velocity
        function easeOutCubic(t) {
          return (--t) * t * t + 1;
        }

        // scroll loop
        function animateScrollStep() {
          var currentTime = Date.now(),
            time = Math.min(1, ((currentTime - start) / duration)),
          // where .5 would be 50% of time on a linear scale easedT gives a
          // fraction based on the easing method
            easedT = easeOutCubic(time);

          if (fromY != Y) {
            self.el.scrollTop = parseInt((easedT * (Y - fromY)) + fromY, 10);
          }
          if (fromX != X) {
            self.el.scrollLeft = parseInt((easedT * (X - fromX)) + fromX, 10);
          }

          if (time < 1) {
            ionic.requestAnimationFrame(animateScrollStep);

          } else {
            // done
            ionic.tap.removeClonedInputs(self.__container, self);
            self.el.style.overflowX = oldOverflowX;
            self.el.style.overflowY = oldOverflowY;
            self.resize();
          }
        }

        // start scroll loop
        ionic.requestAnimationFrame(animateScrollStep);
      }