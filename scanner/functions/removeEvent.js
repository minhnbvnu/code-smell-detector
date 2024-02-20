function removeEvent(el, name, cb) {
      if (el.removeEventListener) {
        el.removeEventListener(name, cb);
      } else if (el.detachEvent) {
        el.detachEvent('on' + name, cb);
      } else {
        return reporter.error("[scroll] Don't know how to remove event listeners.");
      }
    }