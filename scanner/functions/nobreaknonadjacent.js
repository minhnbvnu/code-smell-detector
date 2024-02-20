function nobreaknonadjacent(left, right) {
    left = left || state.tokens.curr;
    right = right || state.tokens.next;
    if (!state.option.laxbreak && left.line !== startLine(right)) {
      warning("W014", right, right.value);
    }
  }