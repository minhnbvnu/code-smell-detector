function altblock1(type) {
    if (type == "}") return cont();
    if (type == "|") return cont(altblock1);
    if (content == "when") {cx.marked = "keyword"; return cont(expression, altblock2);}
    if (type.match(/[\]\);,]/)) return cont(altblock1);
    return pass(pattern, altblock2);
  }