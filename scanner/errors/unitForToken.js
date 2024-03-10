        unitate = function unitate(t) {
      if (token.literal) {
        return literal(t);
      }

      switch (t.val) {
        // era
        case "G":
          return oneOf(loc.eras("short", false), 0);

        case "GG":
          return oneOf(loc.eras("long", false), 0);
        // years

        case "y":
          return intUnit(oneToSix);

        case "yy":
          return intUnit(twoToFour, untruncateYear);

        case "yyyy":
          return intUnit(four);

        case "yyyyy":
          return intUnit(fourToSix);

        case "yyyyyy":
          return intUnit(six);
        // months

        case "M":
          return intUnit(oneOrTwo);

        case "MM":
          return intUnit(two);

        case "MMM":
          return oneOf(loc.months("short", true, false), 1);

        case "MMMM":
          return oneOf(loc.months("long", true, false), 1);

        case "L":
          return intUnit(oneOrTwo);

        case "LL":
          return intUnit(two);

        case "LLL":
          return oneOf(loc.months("short", false, false), 1);

        case "LLLL":
          return oneOf(loc.months("long", false, false), 1);
        // dates

        case "d":
          return intUnit(oneOrTwo);

        case "dd":
          return intUnit(two);
        // ordinals

        case "o":
          return intUnit(oneToThree);

        case "ooo":
          return intUnit(three);
        // time

        case "HH":
          return intUnit(two);

        case "H":
          return intUnit(oneOrTwo);

        case "hh":
          return intUnit(two);

        case "h":
          return intUnit(oneOrTwo);

        case "mm":
          return intUnit(two);

        case "m":
          return intUnit(oneOrTwo);

        case "q":
          return intUnit(oneOrTwo);

        case "qq":
          return intUnit(two);

        case "s":
          return intUnit(oneOrTwo);

        case "ss":
          return intUnit(two);

        case "S":
          return intUnit(oneToThree);

        case "SSS":
          return intUnit(three);

        case "u":
          return simple(oneToNine);
        // meridiem

        case "a":
          return oneOf(loc.meridiems(), 0);
        // weekYear (k)

        case "kkkk":
          return intUnit(four);

        case "kk":
          return intUnit(twoToFour, untruncateYear);
        // weekNumber (W)

        case "W":
          return intUnit(oneOrTwo);

        case "WW":
          return intUnit(two);
        // weekdays

        case "E":
        case "c":
          return intUnit(one);

        case "EEE":
          return oneOf(loc.weekdays("short", false, false), 1);

        case "EEEE":
          return oneOf(loc.weekdays("long", false, false), 1);

        case "ccc":
          return oneOf(loc.weekdays("short", true, false), 1);

        case "cccc":
          return oneOf(loc.weekdays("long", true, false), 1);
        // offset/zone

        case "Z":
        case "ZZ":
          return offset(new RegExp("([+-]" + oneOrTwo.source + ")(?::(" + two.source + "))?"), 2);

        case "ZZZ":
          return offset(new RegExp("([+-]" + oneOrTwo.source + ")(" + two.source + ")?"), 2);
        // we don't support ZZZZ (PST) or ZZZZZ (Pacific Standard Time) in parsing
        // because we don't have any way to figure out what they are

        case "z":
          return simple(/[a-z_+-/]{1,256}?/i);

        default:
          return literal(t);
      }
    };