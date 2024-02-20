function maybeUnescapeQuote() {
      var nextChar = path[index + 1];
      if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
        index++;
        newChar = '\\' + nextChar;
        actions[APPEND]();
        return true;
      }
    }