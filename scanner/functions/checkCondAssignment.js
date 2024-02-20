function checkCondAssignment(expr) {
    var id, paren;
    if (expr) {
      id = expr.id;
      paren = expr.paren;
      if (id === "," && (expr = expr.exprs[expr.exprs.length - 1])) {
        id = expr.id;
        paren = paren || expr.paren;
      }
    }
    switch (id) {
    case "=":
    case "+=":
    case "-=":
    case "*=":
    case "%=":
    case "&=":
    case "|=":
    case "^=":
    case "/=":
      if (!paren && !state.option.boss) {
        warning("W084");
      }
    }
  }