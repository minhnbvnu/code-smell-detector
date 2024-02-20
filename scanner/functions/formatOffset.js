function formatOffset(offset, format) {
    var hours = Math.trunc(offset / 60),
        minutes = Math.abs(offset % 60),
        sign = hours >= 0 && !Object.is(hours, -0) ? "+" : "-",
        base = "" + sign + Math.abs(hours);

    switch (format) {
      case "short":
        return "" + sign + padStart(Math.abs(hours), 2) + ":" + padStart(minutes, 2);

      case "narrow":
        return minutes > 0 ? base + ":" + minutes : base;

      case "techie":
        return "" + sign + padStart(Math.abs(hours), 2) + padStart(minutes, 2);

      default:
        throw new RangeError("Value format " + format + " is out of range for property format");
    }
  }