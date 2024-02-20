function extractISOTime(match, cursor) {
    var item = {
      hour: int(match, cursor, 0),
      minute: int(match, cursor + 1, 0),
      second: int(match, cursor + 2, 0),
      millisecond: parseMillis(match[cursor + 3])
    };
    return [item, null, cursor + 4];
  }