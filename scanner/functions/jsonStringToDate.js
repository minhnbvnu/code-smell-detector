function jsonStringToDate(string) {
    var match;
    if (match = string.match(R_ISO8601_STR)) {
      var date = new Date(0),
          tzHour = 0,
          tzMin  = 0,
          dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear,
          timeSetter = match[8] ? date.setUTCHours : date.setHours;

      if (match[9]) {
        tzHour = toInt(match[9] + match[10]);
        tzMin = toInt(match[9] + match[11]);
      }
      dateSetter.call(date, toInt(match[1]), toInt(match[2]) - 1, toInt(match[3]));
      var h = toInt(match[4] || 0) - tzHour;
      var m = toInt(match[5] || 0) - tzMin;
      var s = toInt(match[6] || 0);
      var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
      timeSetter.call(date, h, m, s, ms);
      return date;
    }
    return string;
  }