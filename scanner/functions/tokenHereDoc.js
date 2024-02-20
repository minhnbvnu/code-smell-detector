function tokenHereDoc(phrase, embed) {
      return function (stream, state) {
        if (stream.sol()) {
          stream.eatSpace()
          if (stream.match(phrase)) {
            state.tokenize.pop();
            return "string";
          }
        }

        var escaped = false;
        while (stream.peek()) {
          if (!escaped) {
            if (stream.match("{%", false)) {
              state.tokenize.push(tokenMacro("%", "%"));
              return "string";
            }

            if (stream.match("{{", false)) {
              state.tokenize.push(tokenMacro("{", "}"));
              return "string";
            }

            if (embed && stream.match("#{", false)) {
              state.tokenize.push(tokenNest("#{", "}", "meta"));
              return "string";
            }

            escaped = embed && stream.next() == "\\";
          } else {
            stream.next();
            escaped = false;
          }
        }

        return "string";
      }
    }