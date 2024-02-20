function removeWithTransition(el, vm, cb) {
    applyTransition(el, -1, function () {
      remove(el);
    }, vm, cb);
  }