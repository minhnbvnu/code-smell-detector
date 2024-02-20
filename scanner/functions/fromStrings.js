function fromStrings(weekdayStr, yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
    var result = {
      year: yearStr.length === 2 ? untruncateYear(parseInteger(yearStr)) : parseInteger(yearStr),
      month: monthsShort.indexOf(monthStr) + 1,
      day: parseInteger(dayStr),
      hour: parseInteger(hourStr),
      minute: parseInteger(minuteStr)
    };
    if (secondStr) result.second = parseInteger(secondStr);

    if (weekdayStr) {
      result.weekday = weekdayStr.length > 3 ? weekdaysLong.indexOf(weekdayStr) + 1 : weekdaysShort.indexOf(weekdayStr) + 1;
    }

    return result;
  }