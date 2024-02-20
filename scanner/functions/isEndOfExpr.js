function isEndOfExpr() {
    var curr = state.tokens.curr;
    var next = state.tokens.next;
    if (next.id === ";" || next.id === "}" || next.id === ":") {
      return true;
    }
    if (isInfix(next) === isInfix(curr) || (curr.id === "yield" && state.inMoz())) {
      return curr.line !== startLine(next);
    }
    return false;
  }