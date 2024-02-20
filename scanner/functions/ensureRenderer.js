function ensureRenderer() {
    return renderer || (renderer = createRenderer(rendererOptions));
  }