function typearg(type) {
    if (type == "variable") { return cont(typearg) }
    else if (type == ":") { return cont(typeexpr) }
  }