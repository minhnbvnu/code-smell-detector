function formatRelativeTime(unit, count, numeric, narrow) {
    if (numeric === void 0) {
      numeric = "always";
    }

    if (narrow === void 0) {
      narrow = false;
    }

    var units = {
      years: ["year", "yr."],
      quarters: ["quarter", "qtr."],
      months: ["month", "mo."],
      weeks: ["week", "wk."],
      days: ["day", "day", "days"],
      hours: ["hour", "hr."],
      minutes: ["minute", "min."],
      seconds: ["second", "sec."]
    };
    var lastable = ["hours", "minutes", "seconds"].indexOf(unit) === -1;

    if (numeric === "auto" && lastable) {
      var isDay = unit === "days";

      switch (count) {
        case 1:
          return isDay ? "tomorrow" : "next " + units[unit][0];

        case -1:
          return isDay ? "yesterday" : "last " + units[unit][0];

        case 0:
          return isDay ? "today" : "this " + units[unit][0];

      }
    }

    var isInPast = Object.is(count, -0) || count < 0,
        fmtValue = Math.abs(count),
        singular = fmtValue === 1,
        lilUnits = units[unit],
        fmtUnit = narrow ? singular ? lilUnits[1] : lilUnits[2] || lilUnits[1] : singular ? units[unit][0] : unit;
    return isInPast ? fmtValue + " " + fmtUnit + " ago" : "in " + fmtValue + " " + fmtUnit;
  }