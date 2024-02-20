function pattern(type, value) {
    if (type == "modifier") { return cont(pattern) }
    if (type == "variable") { register(value); return cont(); }
    if (type == "spread") { return cont(pattern); }
    if (type == "[") { return contCommasep(pattern, "]"); }
    if (type == "{") { return contCommasep(proppattern, "}"); }
  }