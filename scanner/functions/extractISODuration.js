function extractISODuration(match) {
    var s = match[0],
        yearStr = match[1],
        monthStr = match[2],
        weekStr = match[3],
        dayStr = match[4],
        hourStr = match[5],
        minuteStr = match[6],
        secondStr = match[7],
        millisecondsStr = match[8];
    var hasNegativePrefix = s[0] === "-";

    var maybeNegate = function maybeNegate(num) {
      return num && hasNegativePrefix ? -num : num;
    };

    return [{
      years: maybeNegate(parseInteger(yearStr)),
      months: maybeNegate(parseInteger(monthStr)),
      weeks: maybeNegate(parseInteger(weekStr)),
      days: maybeNegate(parseInteger(dayStr)),
      hours: maybeNegate(parseInteger(hourStr)),
      minutes: maybeNegate(parseInteger(minuteStr)),
      seconds: maybeNegate(parseInteger(secondStr)),
      milliseconds: maybeNegate(parseMillis(millisecondsStr))
    }];
  }