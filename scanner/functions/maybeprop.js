function maybeprop() {
    if (content.match(/^\w+$/)) {cx.marked = "variable"; return cont(maybeop);}
    return pass(expression);
  }