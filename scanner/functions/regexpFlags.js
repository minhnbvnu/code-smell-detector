function regexpFlags(regexp) {
    var flags = regexp.flags
    return flags != null ? flags : (regexp.ignoreCase ? "i" : "")
      + (regexp.global ? "g" : "")
      + (regexp.multiline ? "m" : "")
  }