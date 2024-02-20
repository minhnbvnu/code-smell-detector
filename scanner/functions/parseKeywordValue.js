function parseKeywordValue(rawValue) {
        var NOW_VALUE_KEYWORD = "$now$";
        var CURRENT_DATE_KEYWORD = "$currentDate$";
        var parsedValue = rawValue;
        if (rawValue === NOW_VALUE_KEYWORD) {
          parsedValue = Date.now().toString();
        } else if (rawValue === CURRENT_DATE_KEYWORD) {
          parsedValue = Date();
        }
        return parsedValue;
      }