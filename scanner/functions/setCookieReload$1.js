function setCookieReload$1(source, name, value) {
      var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';
      if (isCookieSetWithValue(document.cookie, name, value)) {
        return;
      }
      var validValue = getLimitedCookieValue(value);
      if (validValue === null) {
        logMessage(source, "Invalid cookie value: '".concat(value, "'"));
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
      document.cookie = cookieToSet;
      hit(source);

      // Only reload the page if cookie was set
      // https://github.com/AdguardTeam/Scriptlets/issues/212
      if (isCookieSetWithValue(document.cookie, name, value)) {
        window.location.reload();
      }
    }