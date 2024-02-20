function weekToGregorian(weekData) {
    var weekYear = weekData.weekYear,
        weekNumber = weekData.weekNumber,
        weekday = weekData.weekday,
        weekdayOfJan4 = dayOfWeek(weekYear, 1, 4),
        yearInDays = daysInYear(weekYear);
    var ordinal = weekNumber * 7 + weekday - weekdayOfJan4 - 3,
        year;

    if (ordinal < 1) {
      year = weekYear - 1;
      ordinal += daysInYear(year);
    } else if (ordinal > yearInDays) {
      year = weekYear + 1;
      ordinal -= daysInYear(weekYear);
    } else {
      year = weekYear;
    }

    var _uncomputeOrdinal = uncomputeOrdinal(year, ordinal),
        month = _uncomputeOrdinal.month,
        day = _uncomputeOrdinal.day;

    return Object.assign({
      year: year,
      month: month,
      day: day
    }, timeObject(weekData));
  }