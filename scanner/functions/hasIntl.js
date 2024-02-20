function hasIntl() {
    try {
      return typeof Intl !== "undefined" && Intl.DateTimeFormat;
    } catch (e) {
      return false;
    }
  }