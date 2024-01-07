constructor() {
    this._listeners = [];
    this._deferred = Promise.resolve(undefined);
  }