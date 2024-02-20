function parseISODuration(s) {
    return parse(s, [isoDuration, extractISODuration]);
  }