function parseCookieString(cookieString) {
        var COOKIE_DELIMITER = "=";
        var COOKIE_PAIRS_DELIMITER = ";";
        var cookieChunks = cookieString.split(COOKIE_PAIRS_DELIMITER);
        var cookieData = {};
        cookieChunks.forEach(function (singleCookie) {
          var cookieKey;
          var cookieValue = "";
          var delimiterIndex = singleCookie.indexOf(COOKIE_DELIMITER);
          if (delimiterIndex === -1) {
            cookieKey = singleCookie.trim();
          } else {
            cookieKey = singleCookie.slice(0, delimiterIndex).trim();
            cookieValue = singleCookie.slice(delimiterIndex + 1);
          }
          cookieData[cookieKey] = cookieValue || null;
        });
        return cookieData;
      }