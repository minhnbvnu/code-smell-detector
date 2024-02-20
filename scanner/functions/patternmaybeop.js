function patternmaybeop(type) {
    if (type == "op" && content == ".") return cont();
    if (content == "to") {cx.marked = "keyword"; return cont(pattern);}
    else return pass();
  }