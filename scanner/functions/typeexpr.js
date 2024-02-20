function typeexpr(type) {
    if (type == "variable") {cx.marked = "variable-3"; return cont(afterType);}
    if (type == "string" || type == "number" || type == "atom") { return cont(afterType); }
    if (type == "{") { return cont(pushlex("}"), commasep(typeprop, "}", ",;"), poplex) }
    if (type == "(") { return cont(commasep(typearg, ")"), maybeReturnType) }
  }