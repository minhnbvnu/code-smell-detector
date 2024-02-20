function SettingsContextController({
  browserTheme,
  children,
  componentsPortalContainer,
  profilerPortalContainer
}) {
  const bridge = Object(react["useContext"])(BridgeContext);
  const [displayDensity, setDisplayDensity] = useLocalStorageWithLog('React::DevTools::displayDensity', 'compact');
  const [theme, setTheme] = useLocalStorageWithLog(constants["g" /* LOCAL_STORAGE_BROWSER_THEME */], 'auto');
  const [appendComponentStack, setAppendComponentStack] = useLocalStorageWithLog(constants["m" /* LOCAL_STORAGE_SHOULD_APPEND_COMPONENT_STACK_KEY */], true);
  const [breakOnConsoleErrors, setBreakOnConsoleErrors] = useLocalStorageWithLog(constants["n" /* LOCAL_STORAGE_SHOULD_BREAK_ON_CONSOLE_ERRORS */], false);
  const [parseHookNames, setParseHookNames] = useLocalStorageWithLog(constants["l" /* LOCAL_STORAGE_PARSE_HOOK_NAMES_KEY */], false);
  const [hideConsoleLogsInStrictMode, setHideConsoleLogsInStrictMode] = useLocalStorageWithLog(constants["j" /* LOCAL_STORAGE_HIDE_CONSOLE_LOGS_IN_STRICT_MODE */], false);
  const [showInlineWarningsAndErrors, setShowInlineWarningsAndErrors] = useLocalStorageWithLog(constants["o" /* LOCAL_STORAGE_SHOW_INLINE_WARNINGS_AND_ERRORS_KEY */], true);
  const [traceUpdatesEnabled, setTraceUpdatesEnabled] = useLocalStorageWithLog(constants["p" /* LOCAL_STORAGE_TRACE_UPDATES_ENABLED_KEY */], false);
  const documentElements = Object(react["useMemo"])(() => {
    const array = [document.documentElement];

    if (componentsPortalContainer != null) {
      array.push(componentsPortalContainer.ownerDocument.documentElement);
    }

    if (profilerPortalContainer != null) {
      array.push(profilerPortalContainer.ownerDocument.documentElement);
    }

    return array;
  }, [componentsPortalContainer, profilerPortalContainer]);
  Object(react["useLayoutEffect"])(() => {
    switch (displayDensity) {
      case 'comfortable':
        updateDisplayDensity('comfortable', documentElements);
        break;

      case 'compact':
        updateDisplayDensity('compact', documentElements);
        break;

      default:
        throw Error(`Unsupported displayDensity value "${displayDensity}"`);
    }
  }, [displayDensity, documentElements]);
  Object(react["useLayoutEffect"])(() => {
    switch (theme) {
      case 'light':
        updateThemeVariables('light', documentElements);
        break;

      case 'dark':
        updateThemeVariables('dark', documentElements);
        break;

      case 'auto':
        updateThemeVariables(browserTheme, documentElements);
        break;

      default:
        throw Error(`Unsupported theme value "${theme}"`);
    }
  }, [browserTheme, theme, documentElements]);
  Object(react["useEffect"])(() => {
    bridge.send('updateConsolePatchSettings', {
      appendComponentStack,
      breakOnConsoleErrors,
      showInlineWarningsAndErrors,
      hideConsoleLogsInStrictMode,
      browserTheme
    });
  }, [bridge, appendComponentStack, breakOnConsoleErrors, showInlineWarningsAndErrors, hideConsoleLogsInStrictMode, browserTheme]);
  Object(react["useEffect"])(() => {
    bridge.send('setTraceUpdatesEnabled', traceUpdatesEnabled);
  }, [bridge, traceUpdatesEnabled]);
  const value = Object(react["useMemo"])(() => ({
    appendComponentStack,
    breakOnConsoleErrors,
    displayDensity,
    lineHeight: displayDensity === 'compact' ? constants["d" /* COMPACT_LINE_HEIGHT */] : constants["c" /* COMFORTABLE_LINE_HEIGHT */],
    parseHookNames,
    setAppendComponentStack,
    setBreakOnConsoleErrors,
    setDisplayDensity,
    setParseHookNames,
    setTheme,
    setTraceUpdatesEnabled,
    setShowInlineWarningsAndErrors,
    showInlineWarningsAndErrors,
    setHideConsoleLogsInStrictMode,
    hideConsoleLogsInStrictMode,
    theme,
    browserTheme,
    traceUpdatesEnabled
  }), [appendComponentStack, breakOnConsoleErrors, displayDensity, parseHookNames, setAppendComponentStack, setBreakOnConsoleErrors, setDisplayDensity, setParseHookNames, setTheme, setTraceUpdatesEnabled, setShowInlineWarningsAndErrors, showInlineWarningsAndErrors, setHideConsoleLogsInStrictMode, hideConsoleLogsInStrictMode, theme, browserTheme, traceUpdatesEnabled]);
  return /*#__PURE__*/react["createElement"](SettingsContext.Provider, {
    value: value
  }, children);
}