function getConsoleColor(method) {
  switch (method) {
    case 'warn':
      return consoleSettingsRef.browserTheme === 'light' ? "rgba(250, 180, 50, 0.75)" : "rgba(250, 180, 50, 0.5)";

    case 'error':
      return consoleSettingsRef.browserTheme === 'light' ? "rgba(250, 123, 130, 0.75)" : "rgba(250, 123, 130, 0.5)";

    case 'log':
    default:
      return consoleSettingsRef.browserTheme === 'light' ? "rgba(125, 125, 125, 0.75)" : "rgba(125, 125, 125, 0.5)";
  }
}