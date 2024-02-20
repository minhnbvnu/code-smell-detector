function createSortingMethod(name, hasOptions) {
  return function pseudoNativeMethod(sortCallback) {
    if (this.length < 2) return this;
    initSeemple(this);

    const givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
    const method = Array.prototype[name];

    const eventOptions = {
      method: name,
      self: this,
      added: [],
      removed: []
    };

    // call original method
    if (name === 'sort' && typeof sortCallback === 'function') {
      method.call(this, sortCallback);
    } else {
      method.call(this);
    }

    // extend event options by custom event options if they are given
    if (hasOptions) {
      if (givenEventOptions && typeof givenEventOptions === 'object') {
        assign(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);

    return this;
  };
}