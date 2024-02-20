function objToLocalTS(obj) {
    var d = Date.UTC(obj.year, obj.month - 1, obj.day, obj.hour, obj.minute, obj.second, obj.millisecond); // for legacy reasons, years between 0 and 99 are interpreted as 19XX; revert that

    if (obj.year < 100 && obj.year >= 0) {
      d = new Date(d);
      d.setUTCFullYear(d.getUTCFullYear() - 1900);
    }

    return +d;
  }