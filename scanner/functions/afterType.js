function afterType(type, value) {
    if (value == "<") { return cont(pushlex(">"), commasep(typeexpr, ">"), poplex, afterType) }
    if (value == "|" || type == ".") { return cont(typeexpr) }
    if (type == "[") { return cont(expect("]"), afterType) }
  }