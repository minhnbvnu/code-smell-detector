function eraForDateTime(dt, length) {
    return eras(length)[dt.year < 0 ? 0 : 1];
  }