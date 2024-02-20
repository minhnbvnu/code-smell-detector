function setStrictMode(rendererID, isStrictMode) {
    const rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      if (isStrictMode) {
        rendererInterface.patchConsoleForStrictMode();
      } else {
        rendererInterface.unpatchConsoleForStrictMode();
      }
    } else {
      // This should only happen during initial render in the extension before DevTools
      // finishes its handshake with the injected renderer
      if (isStrictMode) {
        const hideConsoleLogsInStrictMode = window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ === true;
        const browserTheme = window.__REACT_DEVTOOLS_BROWSER_THEME__;
        patchConsoleForInitialRenderInStrictMode({
          hideConsoleLogsInStrictMode,
          browserTheme
        });
      } else {
        unpatchConsoleForInitialRenderInStrictMode();
      }
    }
  }