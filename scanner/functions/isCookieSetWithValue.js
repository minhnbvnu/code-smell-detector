function isCookieSetWithValue(cookieString, name, value) {
        return cookieString.split(";").some(function (cookieStr) {
          var pos = cookieStr.indexOf("=");
          if (pos === -1) {
            return false;
          }
          var cookieName = cookieStr.slice(0, pos).trim();
          var cookieValue = cookieStr.slice(pos + 1).trim();
          return name === cookieName && value === cookieValue;
        });
      }