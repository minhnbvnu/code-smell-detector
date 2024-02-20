function getBrowserWindow (aWindow) {
      return aWindow &&
        aWindow.document.documentElement.getAttribute('windowtype') ==
          'navigator:browser'
        ? aWindow
        : lazy.BrowserWindowTracker.getTopWindow();
    }