function hasFormatToParts() {
    return !isUndefined(Intl.DateTimeFormat.prototype.formatToParts);
  }