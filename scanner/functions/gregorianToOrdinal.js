function gregorianToOrdinal(gregData) {
    var year = gregData.year,
        month = gregData.month,
        day = gregData.day,
        ordinal = computeOrdinal(year, month, day);
    return Object.assign({
      year: year,
      ordinal: ordinal
    }, timeObject(gregData));
  }