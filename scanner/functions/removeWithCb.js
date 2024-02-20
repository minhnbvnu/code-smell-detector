function removeWithCb(el, vm, cb) {
      remove(el);
      if (cb) cb();
    }