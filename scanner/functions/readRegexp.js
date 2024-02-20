function readRegexp(stream) {
    var escaped = false, next, inSet = false;
    while ((next = stream.next()) != null) {
      if (!escaped) {
        if (next == "/" && !inSet) { return; }
        if (next == "[") { inSet = true; }
        else if (inSet && next == "]") { inSet = false; }
      }
      escaped = !escaped && next == "\\";
    }
  }