function stringLiteral(source, setState) {
    while (!source.eol()) {
      var ch = source.next();
      if (ch == '"') {
        setState(normal);
        return "string";
      }
      if (ch == '\\') {
        if (source.eol() || source.eat(whiteCharRE)) {
          setState(stringGap);
          return "string";
        }
        if (source.eat('&')) {
        }
        else {
          source.next(); // should handle other escapes here
        }
      }
    }
    setState(normal);
    return "string error";
  }