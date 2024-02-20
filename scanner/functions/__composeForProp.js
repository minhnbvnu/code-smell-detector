function __composeForProp(chains) {
    return app.meta.util.compose(chains, __composeForPropAdapter);
  }