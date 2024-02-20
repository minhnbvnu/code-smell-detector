function parseMatchArg(match) {
        var INVERT_MARKER = "!";
        var isInvertedMatch = match ? match === null || match === void 0 ? void 0 : match.startsWith(INVERT_MARKER) : false;
        var matchValue = isInvertedMatch ? match.slice(1) : match;
        var matchRegexp = toRegExp(matchValue);
        return {
          isInvertedMatch: isInvertedMatch,
          matchRegexp: matchRegexp,
          matchValue: matchValue
        };
      }