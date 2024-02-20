function ordinalToGregorian(ordinalData) {
    var year = ordinalData.year,
        ordinal = ordinalData.ordinal,
        _uncomputeOrdinal2 = uncomputeOrdinal(year, ordinal),
        month = _uncomputeOrdinal2.month,
        day = _uncomputeOrdinal2.day;

    return Object.assign({
      year: year,
      month: month,
      day: day
    }, timeObject(ordinalData));
  }