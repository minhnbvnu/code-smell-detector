function extractRFC1123Or850(match) {
    var weekdayStr = match[1],
        dayStr = match[2],
        monthStr = match[3],
        yearStr = match[4],
        hourStr = match[5],
        minuteStr = match[6],
        secondStr = match[7],
        result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
  }