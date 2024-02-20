function tokenQuote(end, style, embed) {
      return function (stream, state) {
        var escaped = false;

        while (stream.peek()) {
          if (!escaped) {
            if (stream.match("{%", false)) {
              state.tokenize.push(tokenMacro("%", "%"));
              return style;
            }

            if (stream.match("{{", false)) {
              state.tokenize.push(tokenMacro("{", "}"));
              return style;
            }

            if (embed && stream.match("#{", false)) {
              state.tokenize.push(tokenNest("#{", "}", "meta"));
              return style;
            }

            var ch = stream.next();

            if (ch == end) {
              state.tokenize.pop();
              return style;
            }

            escaped = embed && ch == "\\";
          } else {
            stream.next();
            escaped = false;
          }
        }

        return style;
      };
    }