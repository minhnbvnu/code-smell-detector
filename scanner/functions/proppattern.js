function proppattern(type, value) {
    if (type == "variable" && !cx.stream.match(/^\s*:/, false)) {
      register(value);
      return cont(maybeAssign);
    }
    if (type == "variable") { cx.marked = "property"; }
    if (type == "spread") { return cont(pattern); }
    if (type == "}") { return pass(); }
    return cont(expect(":"), pattern, maybeAssign);
  }