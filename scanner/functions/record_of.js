function record_of(comb) {
    function ro(type) {
      if (content == "mutable" || content == "with") {cx.marked = "keyword"; return cont(ro);}
      if (content.match(/^\w*$/)) {cx.marked = "variable"; return cont(ro);}
      if (type == ":") return cont(comb, ro);
      if (type == "}") return cont();
      return cont(ro);
    }
    return ro;
  }