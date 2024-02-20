function readQuoted(quote, style, embed, unescaped, nextTokenize) {
      return function(stream, state) {
        finishContinue(state);
        var fresh = stream.current().length == 0;
        if (stream.match(/^\\$/, fresh)) {
          if (!fresh) return style;
          continueLine(state, state.indented);
          return "lineContinuation";
        }
        if (stream.match(/^#\{/, fresh)) {
          if (!fresh) return style;
          state.tokenize = rubyInQuote("}", state.tokenize);
          return null;
        }
        var escaped = false, ch;
        while ((ch = stream.next()) != null) {
          if (ch == quote && (unescaped || !escaped)) {
            state.tokenize = nextTokenize;
            break;
          }
          if (embed && ch == "#" && !escaped) {
            if (stream.eat("{")) {
              stream.backUp(2);
              break;
            }
          }
          escaped = !escaped && ch == "\\";
        }
        if (stream.eol() && escaped) {
          stream.backUp(1);
        }
        return style;
      };
    }