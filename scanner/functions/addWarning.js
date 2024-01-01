function addWarning (pagePath, str, message) {
  if (!warnings[pagePath]) { warnings[pagePath] = []; }
  warnings[pagePath].push({
    message: message,
    str: str
  });
  warningCount++;
}