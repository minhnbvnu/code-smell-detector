function enumblock(type) {
    if (type == "}") return cont();
    if (type == "(") return cont(pushlex(")"), commasep(rtype, ")"), poplex, enumblock);
    if (content.match(/^\w+$/)) cx.marked = "def";
    return cont(enumblock);
  }