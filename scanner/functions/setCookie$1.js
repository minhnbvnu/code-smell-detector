function setCookie$1(source, name, value) {
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
      var validValue = getLimitedCookieValue(value);
      if (validValue === null) {
        logMessage(source, "Invalid cookie value: '".concat(validValue, "'"));
        return;
      }
      if (!isValidCookiePath(path)) {
        logMessage(source, "Invalid cookie path: '".concat(path, "'"));
        return;
      }
      var cookieToSet = concatCookieNameValuePath(name, validValue, path);
      if (!cookieToSet) {
        logMessage(source, 'Invalid cookie name or value');
        return;
      }
      hit(source);
      document.cookie = cookieToSet;
    }