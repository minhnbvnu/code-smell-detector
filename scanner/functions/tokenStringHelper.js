function tokenStringHelper(stream, state) {
      var escaped = false;
      while (!stream.eol()) {
        if (!raw && !escaped && stream.peek() == "$") {
          pushInterpolationStack(state);
          state.tokenize = tokenInterpolation;
          return "string";
        }
        var next = stream.next();
        if (next == quote && !escaped && (!tripleQuoted || stream.match(quote + quote))) {
          state.tokenize = null;
          break;
        }
        escaped = !raw && !escaped && next == "\\";
      }
      return "string";
    }