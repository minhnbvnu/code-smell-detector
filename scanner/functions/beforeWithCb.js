function beforeWithCb(el, target, vm, cb) {
      before(el, target);
      if (cb) cb();
    }