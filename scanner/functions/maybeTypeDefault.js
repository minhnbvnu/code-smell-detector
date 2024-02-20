function maybeTypeDefault(_, value) {
    if (value == "=") return cont(typeexpr)
  }