function cancelFrame(listener) {
      // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
      var cancel = clearTimeout;
      return cancel(listener);
    }