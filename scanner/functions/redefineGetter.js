function redefineGetter(obj, prop, value) {
      Object.defineProperty(obj, prop, {
        configurable: true,
        get: function() { return value; }
      });
    }