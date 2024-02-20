function createHydrationRenderer(options) {
    return baseCreateRenderer(options, createHydrationFunctions);
  }