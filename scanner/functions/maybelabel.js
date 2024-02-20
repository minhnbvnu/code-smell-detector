function maybelabel(type) {
    if (type == ":") { return cont(poplex, statement); }
    return pass(maybeoperatorComma, expect(";"), poplex);
  }