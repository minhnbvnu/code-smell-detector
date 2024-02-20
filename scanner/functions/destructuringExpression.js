function destructuringExpression() {
    var id, ids;
    var identifiers = [];
    if (!state.inESNext()) {
      warning("W104", state.tokens.curr, "destructuring expression");
    }
    var nextInnerDE = function() {
      var ident;
      if (checkPunctuators(state.tokens.next, ["[", "{"])) {
        ids = destructuringExpression();
        for (var id in ids) {
          id = ids[id];
          identifiers.push({ id: id.id, token: id.token });
        }
      } else if (checkPunctuators(state.tokens.next, [","])) {
        identifiers.push({ id: null, token: state.tokens.curr });
      } else if (checkPunctuators(state.tokens.next, ["("])) {
        advance("(");
        nextInnerDE();
        advance(")");
      } else {
        var is_rest = checkPunctuators(state.tokens.next, ["..."]);
        ident = identifier();
        if (ident)
          identifiers.push({ id: ident, token: state.tokens.curr });
        return is_rest;
      }
      return false;
    };
    if (checkPunctuators(state.tokens.next, ["["])) {
      advance("[");
      var element_after_rest = false;
      if (nextInnerDE() && checkPunctuators(state.tokens.next, [","]) &&
          !element_after_rest) {
        warning("W130", state.tokens.next);
        element_after_rest = true;
      }
      while (!checkPunctuators(state.tokens.next, ["]"])) {
        advance(",");
        if (checkPunctuators(state.tokens.next, ["]"])) {
          break;
        }
        if (nextInnerDE() && checkPunctuators(state.tokens.next, [","]) &&
            !element_after_rest) {
          warning("W130", state.tokens.next);
          element_after_rest = true;
        }
      }
      advance("]");
    } else if (checkPunctuators(state.tokens.next, ["{"])) {
      advance("{");
      id = identifier();
      if (checkPunctuators(state.tokens.next, [":"])) {
        advance(":");
        nextInnerDE();
      } else {
        identifiers.push({ id: id, token: state.tokens.curr });
      }
      while (!checkPunctuators(state.tokens.next, ["}"])) {
        advance(",");
        if (checkPunctuators(state.tokens.next, ["}"])) {
          break;
        }
        id = identifier();
        if (checkPunctuators(state.tokens.next, [":"])) {
          advance(":");
          nextInnerDE();
        } else {
          identifiers.push({ id: id, token: state.tokens.curr });
        }
      }
      advance("}");
    }
    return identifiers;
  }