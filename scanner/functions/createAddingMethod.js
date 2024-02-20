function createAddingMethod(name, hasOptions) {
  return function pseudoNativeMethod() {
    const { itemMediator } = initSeemple(this);
    // +hasOptions is converted to 0 or 1 depending on its value (false/true)
    const argsLength = arguments.length - +hasOptions;
    const args = Array(argsLength);
    const givenEventOptions = hasOptions ? arguments[arguments.length - 1] : null;
    const useMediator = typeof itemMediator === 'function'
            && (!givenEventOptions || !givenEventOptions.skipItemMediator);
    const isPush = name === 'push';
    let { length } = this;

    // if no arguments are passed
    if (!argsLength) {
      return length;
    }

    // convert arguments to array and call item mediator on every item if it's possible
    for (let i = 0; i < argsLength; i++) {
      const arg = arguments[i];
      if (useMediator) {
        const index = isPush ? i + length : i;
        args[i] = itemMediator(arg, index);
      } else {
        args[i] = arg;
      }
    }

    if (isPush) {
      // insert new items to the end of array
      for (let i = 0; i < argsLength; i++) {
        this[length + i] = args[i];
      }
    } else {
      // move current items to new indexes
      for (let i = length - 1; i >= 0; i--) {
        this[argsLength + i] = this[i];
      }
      // insert new items to the begin of array
      for (let i = 0; i < argsLength; i++) {
        this[i] = args[i];
      }
    }

    // update length
    length += argsLength;
    this.length = length;

    const eventOptions = {
      method: name,
      self: this,
      added: args,
      removed: []
    };

    // extend event options by custom event options if they are given
    if (hasOptions) {
      if (givenEventOptions && typeof givenEventOptions === 'object') {
        assign(eventOptions, givenEventOptions);
      }
    }

    reportModified(this, eventOptions);

    return length;
  };
}