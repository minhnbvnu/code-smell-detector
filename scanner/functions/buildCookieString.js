function buildCookieString(name, value, options) {
    var path, expires;
    options = options || {};
    expires = options.expires;
    path = angular.isDefined(options.path) ? options.path : cookiePath;
    if (angular.isUndefined(value)) {
      expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
      value = '';
    }
    if (angular.isString(expires)) {
      expires = new Date(expires);
    }

    var str = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    str += path ? ';path=' + path : '';
    str += options.domain ? ';domain=' + options.domain : '';
    str += expires ? ';expires=' + expires.toUTCString() : '';
    str += options.secure ? ';secure' : '';

    // per http://www.ietf.org/rfc/rfc2109.txt browser must allow at minimum:
    // - 300 cookies
    // - 20 cookies per unique domain
    // - 4096 bytes per cookie
    var cookieLength = str.length + 1;
    if (cookieLength > 4096) {
      $log.warn('Cookie \'' + name +
        '\' possibly not set or overflowed because it was too large (' +
        cookieLength + ' > 4096 bytes)!');
    }

    return str;
  }