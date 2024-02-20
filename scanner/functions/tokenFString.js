function tokenFString(stream, state) {
        // inside f-str Expression
        if (stream.match(delimiter)) {
          // expression ends pre-maturally, but very common in editing
          // Could show error to remind users to close brace here
          state.tokenize = tokenString
          return OUTCLASS;
        } else if (stream.match('{')) {
          // starting brace, if not eaten below
          return "punctuation";
        } else if (stream.match('}')) {
          // return to regular inside string state
          state.tokenize = tokenString
          return "punctuation";
        } else {
          // use tokenBaseInner to parse the expression
          return tokenBaseInner(stream, state);
        }
      }