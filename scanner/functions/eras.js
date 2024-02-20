function eras(length) {
    switch (length) {
      case "narrow":
        return erasNarrow;

      case "short":
        return erasShort;

      case "long":
        return erasLong;

      default:
        return null;
    }
  }