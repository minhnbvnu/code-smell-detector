function requestFrame(callback) {
      // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
      var raf = function(fn) {
        return setTimeout(fn, 0);
      };
      return raf(callback);
    }