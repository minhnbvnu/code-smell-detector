function trustedSetCookieReload$1(source, name, value) {
      var offsetExpiresSec = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var path = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '/';
      if (typeof name === 'undefined') {
        logMessage(source, 'Cookie name should be specified');
        return;
      }
      if (typeof value === 'undefined') {
        logMessage(source, 'Cookie value should be specified');
        return;
      }

      // Prevent infinite reloads if cookie was already set or blocked by the browser
      // https://github.com/AdguardTeam/Scriptlets/issues/212
      if (isCookieSetWithValue(document.cookie, name, value)) {
        return;
      }
      var parsedValue = parseKeywordValue(value);
      if (!isValidCookiePath(path)) {
        logMessage(source, "Invalid cookie path: '".concat(path, "'"));
        return;
      }
      var cookieToSet = concatCookieNameValuePath(name, parsedValue, path, false);
      if (!cookieToSet) {
        logMessage(source, 'Invalid cookie name or value');
        return;
      }
      if (offsetExpiresSec) {
        var parsedOffsetMs = getTrustedCookieOffsetMs(offsetExpiresSec);
        if (!parsedOffsetMs) {
          logMessage(source, "Invalid offsetExpiresSec value: ".concat(offsetExpiresSec));
          return;
        }
        var expires = Date.now() + parsedOffsetMs;
        cookieToSet += " expires=".concat(new Date(expires).toUTCString(), ";");
      }
      document.cookie = cookieToSet;
      hit(source);

      // Get cookie value, it's required for checking purpose
      // in case if $now$ or $currentDate$ value is used
      // https://github.com/AdguardTeam/Scriptlets/issues/291
      var cookieValueToCheck = parseCookieString(document.cookie)[name];

      // Only reload the page if cookie was set
      // https://github.com/AdguardTeam/Scriptlets/issues/212
      if (isCookieSetWithValue(document.cookie, name, cookieValueToCheck)) {
        window.location.reload();
      }
    }