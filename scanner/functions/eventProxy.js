function eventProxy(e) {
  return this._listeners[e.type](options.event && options.event(e) || e);
}