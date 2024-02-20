function meridiemForDateTime(dt) {
    return meridiems[dt.hour < 12 ? 0 : 1];
  }