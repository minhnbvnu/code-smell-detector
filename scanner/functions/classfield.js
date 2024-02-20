function classfield(type, value) {
    if (value == "?") { return cont(classfield) }
    if (type == ":") { return cont(typeexpr, maybeAssign) }
    return pass(functiondef)
  }