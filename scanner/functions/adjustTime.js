function adjustTime(inst, dur) {
    var _dur;

    var keys = Object.keys(dur.values);

    if (keys.indexOf("milliseconds") === -1) {
      keys.push("milliseconds");
    }

    dur = (_dur = dur).shiftTo.apply(_dur, keys);
    var oPre = inst.o,
        year = inst.c.year + dur.years,
        month = inst.c.month + dur.months + dur.quarters * 3,
        c = Object.assign({}, inst.c, {
      year: year,
      month: month,
      day: Math.min(inst.c.day, daysInMonth(year, month)) + dur.days + dur.weeks * 7
    }),
        millisToAdd = Duration.fromObject({
      hours: dur.hours,
      minutes: dur.minutes,
      seconds: dur.seconds,
      milliseconds: dur.milliseconds
    }).as("milliseconds"),
        localTS = objToLocalTS(c);

    var _fixOffset = fixOffset(localTS, oPre, inst.zone),
        ts = _fixOffset[0],
        o = _fixOffset[1];

    if (millisToAdd !== 0) {
      ts += millisToAdd; // that could have changed the offset by going over a DST, but we want to keep the ts the same

      o = inst.zone.offset(ts);
    }

    return {
      ts: ts,
      o: o
    };
  }