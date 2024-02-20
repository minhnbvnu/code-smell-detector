function syncSavedPreferences() {
  chrome.devtools.inspectedWindow.eval(`window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = ${JSON.stringify(Object(utils["f" /* getAppendComponentStack */])())};
    window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = ${JSON.stringify(Object(utils["g" /* getBreakOnConsoleErrors */])())};
    window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ = ${JSON.stringify(Object(utils["p" /* getSavedComponentFilters */])())};
    window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = ${JSON.stringify(Object(utils["q" /* getShowInlineWarningsAndErrors */])())};
    window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ = ${JSON.stringify(Object(utils["m" /* getHideConsoleLogsInStrictMode */])())};
    window.__REACT_DEVTOOLS_BROWSER_THEME__ = ${JSON.stringify(getBrowserTheme())};`);
}