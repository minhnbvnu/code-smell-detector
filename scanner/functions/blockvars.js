function blockvars(type) {
    if (type == "name") {cx.marked = "def"; return cont(blockvars);}
    if (type == "op" && content == "|") return cont();
    return cont(blockvars);
  }