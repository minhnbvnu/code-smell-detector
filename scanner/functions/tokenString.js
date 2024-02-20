function tokenString(quote) {
      return function(stream, state) {
        var escaped = false, ch;
        while ((ch = stream.next()) != null) {
          if (ch == quote && !escaped) {
            if (quote == ")") { stream.backUp(1); }
            break;
          }
          escaped = !escaped && ch == "\\";
        }
        if (ch == quote || !escaped && quote != ")") { state.tokenize = null; }
        return ["string", "string"];
      };
    }