function extractASCII(match) {
    var weekdayStr = match[1],
        monthStr = match[2],
        dayStr = match[3],
        hourStr = match[4],
        minuteStr = match[5],
        secondStr = match[6],
        yearStr = match[7],
        result = fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr);
    return [result, FixedOffsetZone.utcInstance];
  }