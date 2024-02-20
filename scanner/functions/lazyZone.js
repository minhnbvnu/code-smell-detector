function lazyZone(name) {
  return {
    configurable: true,
    enumerable: true,
    get: function() {
      delete this[name];
      TimezoneService.reset();
      return this[name];
    }
  };
}