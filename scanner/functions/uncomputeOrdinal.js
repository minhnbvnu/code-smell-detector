function uncomputeOrdinal(year, ordinal) {
    var table = isLeapYear(year) ? leapLadder : nonLeapLadder,
        month0 = table.findIndex(function (i) {
      return i < ordinal;
    }),
        day = ordinal - table[month0];
    return {
      month: month0 + 1,
      day: day
    };
  }