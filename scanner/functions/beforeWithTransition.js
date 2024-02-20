function beforeWithTransition(el, target, vm, cb) {
    applyTransition(el, 1, function () {
      before(el, target);
    }, vm, cb);
  }