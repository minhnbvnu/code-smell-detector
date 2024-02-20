function dateTimeFromMatches(matches) {
    var toField = function toField(token) {
      switch (token) {
        case "S":
          return "millisecond";

        case "s":
          return "second";

        case "m":
          return "minute";

        case "h":
        case "H":
          return "hour";

        case "d":
          return "day";

        case "o":
          return "ordinal";

        case "L":
        case "M":
          return "month";

        case "y":
          return "year";

        case "E":
        case "c":
          return "weekday";

        case "W":
          return "weekNumber";

        case "k":
          return "weekYear";

        case "q":
          return "quarter";

        default:
          return null;
      }
    };

    var zone;

    if (!isUndefined(matches.Z)) {
      zone = new FixedOffsetZone(matches.Z);
    } else if (!isUndefined(matches.z)) {
      zone = IANAZone.create(matches.z);
    } else {
      zone = null;
    }

    if (!isUndefined(matches.q)) {
      matches.M = (matches.q - 1) * 3 + 1;
    }

    if (!isUndefined(matches.h)) {
      if (matches.h < 12 && matches.a === 1) {
        matches.h += 12;
      } else if (matches.h === 12 && matches.a === 0) {
        matches.h = 0;
      }
    }

    if (matches.G === 0 && matches.y) {
      matches.y = -matches.y;
    }

    if (!isUndefined(matches.u)) {
      matches.S = parseMillis(matches.u);
    }

    var vals = Object.keys(matches).reduce(function (r, k) {
      var f = toField(k);

      if (f) {
        r[f] = matches[k];
      }

      return r;
    }, {});
    return [vals, zone];
  }