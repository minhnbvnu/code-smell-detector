function eventListener(e) {
      if (eventListener.once) {
        e.currentTarget.removeEventListener(
          e.type,
          callback,
          eventListener
        );
        eventListener.removed = true;
      }
      if (eventListener.passive) {
        e.preventDefault = createEventListener.preventDefault;
      }
      if (typeof eventListener.callback === 'function') {
        /* jshint validthis: true */
        eventListener.callback.call(this, e);
      } else if (eventListener.callback) {
        eventListener.callback.handleEvent(e);
      }
      if (eventListener.passive) {
        delete e.preventDefault;
      }
    }