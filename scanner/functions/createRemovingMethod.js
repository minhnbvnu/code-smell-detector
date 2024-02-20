function createRemovingMethod(name, hasOptions) {
  return function pseudoNativeMethod(givenEventOptions) {
    if (!this.length) {
      return undefined;
    }
    initSeemple(this);

    // call original method
    const returns = Array.prototype[name].call(this);
    const eventOptions = {
      method: name,
      self: this,
      added: [],
      removed: [returns]
    };

    // extend event options by custom event options if they are given
    if (hasOptions) {
      if (givenEventOptions && typeof givenEventOptions === 'object') {
        assign(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);

    return returns;
  };
}