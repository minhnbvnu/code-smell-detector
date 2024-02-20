function concatCookieNameValuePath(rawName, rawValue, rawPath) {
        var shouldEncode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
        var COOKIE_BREAKER = ";";
        if (!shouldEncode && (rawName.includes(COOKIE_BREAKER) || "".concat(rawValue).includes(COOKIE_BREAKER))) {
          return null;
        }
        var name = shouldEncode ? encodeURIComponent(rawName) : rawName;
        var value = shouldEncode ? encodeURIComponent(rawValue) : rawValue;
        return "".concat(name, "=").concat(value, "; ").concat(getCookiePath(rawPath), ";");
      }