function printMessage(type, message) {
  const error = formatError(message);
  const innerHtml = appDiv.innerHTML;
  const label = type === "info" ? "" : "<h2>Query Error</h2>";
  const code = `<hr>${label}<div class="${type} message">${error}</div>`;
  appDiv.innerHTML = innerHtml + code;
}