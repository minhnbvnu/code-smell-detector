function toRegex(val, caret) {
    if (!val) { return /(?:)/; }
    var flags = "";
    if (val instanceof RegExp) {
      if (val.ignoreCase) { flags = "i"; }
      val = val.source;
    } else {
      val = String(val);
    }
    return new RegExp((caret === false ? "" : "^") + "(?:" + val + ")", flags);
  }