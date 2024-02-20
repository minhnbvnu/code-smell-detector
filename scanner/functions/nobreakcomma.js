function nobreakcomma(left, right) {
    if (left.line !== startLine(right)) {
      if (!state.option.laxcomma) {
        if (comma.first) {
          warning("I001");
          comma.first = false;
        }
        warning("W014", left, right.value);
      }
    }
  }