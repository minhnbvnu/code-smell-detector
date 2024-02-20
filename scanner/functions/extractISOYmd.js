function extractISOYmd(match, cursor) {
    var item = {
      year: int(match, cursor),
      month: int(match, cursor + 1, 1),
      day: int(match, cursor + 2, 1)
    };
    return [item, null, cursor + 3];
  }