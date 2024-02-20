function d3_selection_interruptNS(ns) {
    return function() {
      var lock, active;
      if ((lock = this[ns]) && (active = lock[lock.active])) {
        if (--lock.count) {
          delete lock[lock.active];
          lock.active += .5;
        } else {
          delete this[ns];
        }
        active.event && active.event.interrupt.call(this, this.__data__, active.index);
      }
    };
  }