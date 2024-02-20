function noeval(source) {
        window.eval = function evalWrapper(s) {
          hit(source);
          logMessage(source, "AdGuard has prevented eval:\n".concat(s), true);
        }.bind();
      }