constructor(initialStack) {
      this.stack = !initialStack ? [] : Array.prototype.slice.call(initialStack, 0);
    }