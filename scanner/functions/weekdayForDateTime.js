function weekdayForDateTime(dt, length) {
    return weekdays(length)[dt.weekday - 1];
  }