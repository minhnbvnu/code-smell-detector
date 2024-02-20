function functiondef(type, value) {
    if (value == "*") {cx.marked = "keyword"; return cont(functiondef);}
    if (type == "variable") {register(value); return cont(functiondef);}
    if (type == "(") { return cont(pushcontext, pushlex(")"), commasep(funarg, ")"), poplex, maybetype, statement, popcontext); }
  }