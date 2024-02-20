function funarg(type) {
    if (type == "spread") { return cont(funarg); }
    return pass(pattern, maybetype, maybeAssign);
  }