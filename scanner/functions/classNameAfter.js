function classNameAfter(type, value) {
    if (value == "extends" || value == "implements" || (isTS && type == ","))
      { return cont(isTS ? typeexpr : expression, classNameAfter); }
    if (type == "{") { return cont(pushlex("}"), classBody, poplex); }
  }