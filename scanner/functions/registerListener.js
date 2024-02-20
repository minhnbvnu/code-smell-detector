function registerListener(listenable, handler) {
  var listeners = listenable.listeners || (listenable.listeners = []);
  listeners.push(handler);

  if (listenable.listened) {
    if (listeners.length === 1 && listenable.wakeup) {
      listenable.wakeup();
    }
  } else {
    listenable.listened = true;
  }

  return Object(__WEBPACK_IMPORTED_MODULE_0__utils__["u" /* once */])(function () {
    var idx = listeners.indexOf(handler);

    if (idx > -1) {
      listeners.splice(idx, 1);

      if (listeners.length < 1 && listenable.sleep) {
        listenable.sleep();
      }
    }
  });
}