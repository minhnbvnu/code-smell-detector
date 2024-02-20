function eventTargetMixin() {
  return {
    addEventListener(evName, listener) {
      const listeners = this._listeners[evName] || [];
      listeners.push(listener);
      this._listeners[evName] = listeners;
    },
    dispatchEvent(evName, ev) {
      const listeners = this._listeners[evName] || [];
      listeners.forEach(fn => fn(ev));
    },
    removeEventListener(evName, listener) {
      const listeners = this._listeners[evName] || [];
      this._listeners[evName] = listeners.filter(fn => fn != listener);
    },
    _listeners: {},
  };
}