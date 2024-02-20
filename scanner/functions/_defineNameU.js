function _defineNameU(fn, value) {
    return Object.defineProperty(fn, 'name', { value: value, configurable: true });
  }