function getTrustedCookieOffsetMs(offsetExpiresSec) {
        var ONE_YEAR_EXPIRATION_KEYWORD = "1year";
        var ONE_DAY_EXPIRATION_KEYWORD = "1day";
        var MS_IN_SEC = 1e3;
        var SECONDS_IN_YEAR = 365 * 24 * 60 * 60;
        var SECONDS_IN_DAY = 24 * 60 * 60;
        var parsedSec;
        if (offsetExpiresSec === ONE_YEAR_EXPIRATION_KEYWORD) {
          parsedSec = SECONDS_IN_YEAR;
        } else if (offsetExpiresSec === ONE_DAY_EXPIRATION_KEYWORD) {
          parsedSec = SECONDS_IN_DAY;
        } else {
          parsedSec = Number.parseInt(offsetExpiresSec, 10);
          if (Number.isNaN(parsedSec)) {
            return null;
          }
        }
        return parsedSec * MS_IN_SEC;
      }