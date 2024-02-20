function forwardMethods(proto, methods) {
    for (let i=0; i < methods.length; i++) {
      let method = methods[i];
      /* eslint-disable valid-jsdoc */
      proto[method] = /** @this {DomApi} */ function() {
        return this.node[method].apply(this.node, arguments);
      };
      /* eslint-enable */
    }
  }