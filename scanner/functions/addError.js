function addError (pagePath, str, message) {
  if (!errors[pagePath]) { errors[pagePath] = []; }
  errors[pagePath].push({
    message: message,
    str: str
  });
  errorCount++;
}