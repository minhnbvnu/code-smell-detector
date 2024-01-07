function hasIteratorFunction(target) {
    return typeof Symbol !== 'undefined' &&
      typeof target === 'object' &&
      typeof Symbol.iterator !== 'undefined' &&
      typeof target[Symbol.iterator] === 'function';
  }