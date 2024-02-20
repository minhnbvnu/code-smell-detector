function importSpec(type, value) {
    if (type == "{") { return contCommasep(importSpec, "}"); }
    if (type == "variable") { register(value); }
    if (value == "*") { cx.marked = "keyword"; }
    return cont(maybeAs);
  }