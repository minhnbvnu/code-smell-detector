function toUnescaped(stream, end) {
    var escaped = false, next;
    while ((next = stream.next()) != null) {
      if (next == end && !escaped)
        return true;
      escaped = !escaped && next == "\\";
    }
  }