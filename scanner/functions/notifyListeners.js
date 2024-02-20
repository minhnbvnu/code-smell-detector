function notifyListeners(listenable, change) {
  var prevU = Object(__WEBPACK_IMPORTED_MODULE_1__derivation__["j" /* untrackedStart */])();
  var listeners = listenable.listeners;

  if (!listeners) {
    return;
  }

  listeners = listeners.slice();

  for (var i = 0, l = listeners.length; i < l; i++) {
    listeners[i](change);
  }

  Object(__WEBPACK_IMPORTED_MODULE_1__derivation__["i" /* untrackedEnd */])(prevU);
}