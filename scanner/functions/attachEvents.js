function attachEvents() {
      if (browser.addEventListener) {

        // set touchstart event on element
        if (browser.touch) {
          element.addEventListener('touchstart', events, browser.passiveEvents ? { passive: true } : false);
        }

        if (options.draggable) {
          element.addEventListener('mousedown', events, false);
        }

        if (browser.transitions) {
          element.addEventListener('webkitTransitionEnd', events, false);
          element.addEventListener('msTransitionEnd', events, false);
          element.addEventListener('oTransitionEnd', events, false);
          element.addEventListener('otransitionend', events, false);
          element.addEventListener('transitionend', events, false);
        }

        // set resize event on window
        root.addEventListener('resize', events, false);

      } else {
        root.onresize = throttledSetup; // to play nice with old IE
      }
    }