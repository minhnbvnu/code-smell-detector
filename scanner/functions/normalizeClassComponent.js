function normalizeClassComponent(component) {
    return isClassComponent(component) ? component.__vccOpts : component;
  }