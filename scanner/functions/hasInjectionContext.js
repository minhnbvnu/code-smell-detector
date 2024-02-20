function hasInjectionContext() {
    return !!(currentInstance || currentRenderingInstance || currentApp);
  }