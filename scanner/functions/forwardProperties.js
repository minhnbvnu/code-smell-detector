function forwardProperties(proto, properties) {
    for (let i=0; i < properties.length; i++) {
      let name = properties[i];
      Object.defineProperty(proto, name, {
        get: function() {
          const domApi = /** @type {DomApi} */(this);
          return domApi.node[name];
        },
        set: function(value) {
          /** @type {DomApi} */ (this).node[name] = value;
        },
        configurable: true
      });
    }
  }