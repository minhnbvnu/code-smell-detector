function classExpression(type, value) {
    // Class expressions may have an optional name.
    if (type == "variable") { return className(type, value); }
    return classNameAfter(type, value);
  }