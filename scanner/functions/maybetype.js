function maybetype(type, value) {
    if (isTS) {
      if (type == ":") { return cont(typeexpr); }
      if (value == "?") { return cont(maybetype); }
    }
  }