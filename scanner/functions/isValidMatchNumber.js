function isValidMatchNumber(match) {
        var INVERT_MARKER = "!";
        var str = match;
        if (match !== null && match !== void 0 && match.startsWith(INVERT_MARKER)) {
          str = match.slice(1);
        }
        var num = parseFloat(str);
        return !nativeIsNaN(num) && nativeIsFinite(num);
      }