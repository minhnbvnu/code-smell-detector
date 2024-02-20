function forspec2(type, value) {
    if (type == ";") { return cont(forspec3); }
    if (value == "in" || value == "of") { cx.marked = "keyword"; return cont(expression); }
    return pass(expression, expect(";"), forspec3);
  }