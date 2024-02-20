function removeCookie$1(source, match) {
      var matchRegexp = toRegExp(match);
      var removeCookieFromHost = function removeCookieFromHost(cookieName, hostName) {
        var cookieSpec = "".concat(cookieName, "=");
        var domain1 = "; domain=".concat(hostName);
        var domain2 = "; domain=.".concat(hostName);
        var path = '; path=/';
        var expiration = '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = cookieSpec + expiration;
        document.cookie = cookieSpec + domain1 + expiration;
        document.cookie = cookieSpec + domain2 + expiration;
        document.cookie = cookieSpec + path + expiration;
        document.cookie = cookieSpec + domain1 + path + expiration;
        document.cookie = cookieSpec + domain2 + path + expiration;
        hit(source);
      };
      var rmCookie = function rmCookie() {
        document.cookie.split(';').forEach(function (cookieStr) {
          var pos = cookieStr.indexOf('=');
          if (pos === -1) {
            return;
          }
          var cookieName = cookieStr.slice(0, pos).trim();
          if (!matchRegexp.test(cookieName)) {
            return;
          }
          var hostParts = document.location.hostname.split('.');
          for (var i = 0; i <= hostParts.length - 1; i += 1) {
            var hostName = hostParts.slice(i).join('.');
            if (hostName) {
              removeCookieFromHost(cookieName, hostName);
            }
          }
        });
      };
      rmCookie();
      window.addEventListener('beforeunload', rmCookie);
    }