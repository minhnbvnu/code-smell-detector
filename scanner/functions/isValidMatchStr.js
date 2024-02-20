function isValidMatchStr(match) {
        var INVERT_MARKER = "!";
        var str = match;
        if (match !== null && match !== void 0 && match.startsWith(INVERT_MARKER)) {
          str = match.slice(1);
        }
        return isValidStrPattern(str);
      }