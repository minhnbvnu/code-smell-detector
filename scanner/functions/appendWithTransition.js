function appendWithTransition(el, target, vm, cb) {
    applyTransition(el, 1, function () {
      target.appendChild(el);
    }, vm, cb);
  }