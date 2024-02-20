function writeConsolePatchSettingsToWindow(settings) {
  window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = settings.appendComponentStack;
  window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = settings.breakOnConsoleErrors;
  window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = settings.showInlineWarningsAndErrors;
  window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ = settings.hideConsoleLogsInStrictMode;
  window.__REACT_DEVTOOLS_BROWSER_THEME__ = settings.browserTheme;
}