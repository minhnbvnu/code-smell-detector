function stringWithEscapes(stream, state) {
    var escaped = false, next, end = false;

    if (stream.current() == '"') return "string";

    // "Complex" syntax
    if (stream.match("${", false) || stream.match("{$", false)) {
      state.tokenize = null;
      return "string";
    }

    // Simple syntax
    if (stream.match(/\$[a-zA-Z_][a-zA-Z0-9_]*/)) {
      // After the variable name there may appear array or object operator.
      if (stream.match("[", false)) {
        // Match array operator
        state.tokenize = matchSequence([
          [["[", null]],
          [[/\d[\w\.]*/, "number"],
           [/\$[a-zA-Z_][a-zA-Z0-9_]*/, "variable-2"],
           [/[\w\$]+/, "variable"]],
          [["]", null]]
        ]);
      }
      if (stream.match(/\-\>\w/, false)) {
        // Match object operator
        state.tokenize = matchSequence([
          [["->", null]],
          [[/[\w]+/, "variable"]]
        ]);
      }
      return "variable-2";
    }

    // Normal string
    while (
      !stream.eol() &&
      (!stream.match("{$", false)) &&
      (!stream.match(/(\$[a-zA-Z_][a-zA-Z0-9_]*|\$\{)/, false) || escaped)
    ) {
      next = stream.next();
      if (!escaped && next == '"') { end = true; break; }
      escaped = !escaped && next == "\\";
    }
    if (end) {
      state.tokenize = null;
      state.phpEncapsStack.pop();
    }
    return "string";
  }