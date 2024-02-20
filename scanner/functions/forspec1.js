function forspec1(type) {
    if (type == "var") { return cont(vardef, expect(";"), forspec2); }
    if (type == ";") { return cont(forspec2); }
    if (type == "variable") { return cont(formaybeinof); }
    return pass(expression, expect(";"), forspec2);
  }