function patchConsoleForInitialRenderInStrictMode({
    hideConsoleLogsInStrictMode,
    browserTheme
  }) {
    const overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

    if (unpatchFn !== null) {
      // Don't patch twice.
      return;
    }

    const originalConsoleMethods = {};

    unpatchFn = () => {
      for (const method in originalConsoleMethods) {
        try {
          targetConsole[method] = originalConsoleMethods[method];
        } catch (error) {}
      }
    };

    overrideConsoleMethods.forEach(method => {
      try {
        const originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method];

        const overrideMethod = (...args) => {
          if (!hideConsoleLogsInStrictMode) {
            // Dim the text color of the double logs if we're not
            // hiding them.
            let color;

            switch (method) {
              case 'warn':
                color = browserTheme === 'light' ? "rgba(250, 180, 50, 0.75)" : "rgba(250, 180, 50, 0.5)";
                break;

              case 'error':
                color = browserTheme === 'light' ? "rgba(250, 123, 130, 0.75)" : "rgba(250, 123, 130, 0.5)";
                break;

              case 'log':
              default:
                color = browserTheme === 'light' ? "rgba(125, 125, 125, 0.75)" : "rgba(125, 125, 125, 0.5)";
                break;
            }

            if (color) {
              originalMethod(...formatWithStyles(args, `color: ${color}`));
            } else {
              throw Error('Console color is not defined');
            }
          }
        };

        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  }