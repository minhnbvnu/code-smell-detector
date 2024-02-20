function tokenParenthesized(stream, state) {
      stream.next(); // Must be "("
      if (!stream.match(/\s*[\"\')]/, false))
        { state.tokenize = tokenString(")"); }
      else
        { state.tokenize = null; }
      return [null, "("];
    }