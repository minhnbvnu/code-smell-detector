function detectSupport() {
        if ((options.touchSupport === true) || (options.touchSupport === false)) return options.touchSupport;
          else return hasTouchSupport();
      }