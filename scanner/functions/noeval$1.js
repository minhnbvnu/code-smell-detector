function noeval$1(source) {
      window.eval = function evalWrapper(s) {
        hit(source);
        logMessage(source, "AdGuard has prevented eval:\n".concat(s), true);
      }.bind();
    }