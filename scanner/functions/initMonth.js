function initMonth() {
      daysInMonth = Time.daysInMonth(
        self.last.month, self.last.year
      );

      byMonthDay = self.normalizeByMonthDayRules(
        self.last.year,
        self.last.month,
        self.by_data.BYMONTHDAY
      );

      dateLen = byMonthDay.length;

      // For the case of more than one occurrence in one month
      // we have to be sure to start searching after the last
      // found date or at the last BYMONTHDAY, unless we are
      // initializing the iterator because in this case we have
      // to consider the last found date too.
      while (byMonthDay[dateIdx] <= lastDay &&
             !(isInit && byMonthDay[dateIdx] == lastDay) &&
             dateIdx < dateLen - 1) {
        dateIdx++;
      }
    }