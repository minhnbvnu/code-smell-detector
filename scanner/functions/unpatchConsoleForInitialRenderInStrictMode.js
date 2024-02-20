function unpatchConsoleForInitialRenderInStrictMode() {
    if (unpatchFn !== null) {
      unpatchFn();
      unpatchFn = null;
    }
  }