function patchForStrictMode() {
  if (react_devtools_feature_flags__WEBPACK_IMPORTED_MODULE_3__[/* consoleManagedByDevToolsDuringStrictMode */ "a"]) {
    const overrideConsoleMethods = ['error', 'group', 'groupCollapsed', 'info', 'log', 'trace', 'warn'];

    if (unpatchForStrictModeFn !== null) {
      // Don't patch twice.
      return;
    }

    const originalConsoleMethods = {};

    unpatchForStrictModeFn = () => {
      for (const method in originalConsoleMethods) {
        try {
          targetConsole[method] = originalConsoleMethods[method];
        } catch (error) {}
      }
    };

    overrideConsoleMethods.forEach(method => {
      try {
        const originalMethod = originalConsoleMethods[method] = targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ ? targetConsole[method].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ : targetConsole[method]; // $FlowFixMe[missing-local-annot]

        const overrideMethod = (...args) => {
          if (!consoleSettingsRef.hideConsoleLogsInStrictMode) {
            // Dim the text color of the double logs if we're not
            // hiding them.
            if (isNode) {
              originalMethod(DIMMED_NODE_CONSOLE_COLOR, Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* format */ "f"])(...args));
            } else {
              const color = getConsoleColor(method);

              if (color) {
                originalMethod(...Object(_utils__WEBPACK_IMPORTED_MODULE_0__[/* formatWithStyles */ "g"])(args, `color: ${color}`));
              } else {
                throw Error('Console color is not defined');
              }
            }
          }
        };

        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        targetConsole[method] = overrideMethod;
      } catch (error) {}
    });
  }
}