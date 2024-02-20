function explainFromTokens(locale, input, format) {
    var tokens = expandMacroTokens(Formatter.parseFormat(format), locale),
        units = tokens.map(function (t) {
      return unitForToken(t, locale);
    }),
        disqualifyingUnit = units.find(function (t) {
      return t.invalidReason;
    });

    if (disqualifyingUnit) {
      return {
        input: input,
        tokens: tokens,
        invalidReason: disqualifyingUnit.invalidReason
      };
    } else {
      var _buildRegex = buildRegex(units),
          regexString = _buildRegex[0],
          handlers = _buildRegex[1],
          regex = RegExp(regexString, "i"),
          _match = match(input, regex, handlers),
          rawMatches = _match[0],
          matches = _match[1],
          _ref6 = matches ? dateTimeFromMatches(matches) : [null, null],
          result = _ref6[0],
          zone = _ref6[1];

      if (hasOwnProperty(matches, "a") && hasOwnProperty(matches, "H")) {
        throw new ConflictingSpecificationError("Can't include meridiem when specifying 24-hour format");
      }

      return {
        input: input,
        tokens: tokens,
        regex: regex,
        rawMatches: rawMatches,
        matches: matches,
        result: result,
        zone: zone
      };
    }
  }