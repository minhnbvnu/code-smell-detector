function maybeTarget(noComma) {
    return function(type) {
      if (type == ".") { return cont(noComma ? targetNoComma : target); }
      else { return pass(noComma ? expressionNoComma : expression); }
    };
  }