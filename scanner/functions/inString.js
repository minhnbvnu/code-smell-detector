function inString (delimiter, previousTokenizer) {
      return function (stream, state) {
        if (!state.escapeNext && stream.eat(delimiter)) {
          state.tokenize = previousTokenizer;
        } else {
          if (state.escapeNext) {
            state.escapeNext = false;
          }

          var ch = stream.next();

          // Take into account the backslash for escaping characters, such as
          // the string delimiter.
          if (ch == "\\") {
            state.escapeNext = true;
          }
        }

        return "string";
      };
    }