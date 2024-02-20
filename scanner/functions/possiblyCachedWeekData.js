function possiblyCachedWeekData(dt) {
    if (dt.weekData === null) {
      dt.weekData = gregorianToWeek(dt.c);
    }

    return dt.weekData;
  }