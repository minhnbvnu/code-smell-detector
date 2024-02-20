function __composeForPropAsync(chains) {
    return app.meta.util.composeAsync(chains, __composeForPropAdapter);
  }