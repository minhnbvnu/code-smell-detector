function forspec(type) {
    if (type == "(") { return cont(pushlex(")"), forspec1, expect(")"), poplex); }
  }