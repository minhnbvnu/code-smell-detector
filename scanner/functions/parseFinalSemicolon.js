function parseFinalSemicolon() {
    if (state.tokens.next.id !== ";") {
      if (state.tokens.next.isUnclosed) return advance();

      var sameLine = startLine(state.tokens.next) === state.tokens.curr.line &&
                     state.tokens.next.id !== "(end)";
      var blockEnd = checkPunctuator(state.tokens.next, "}");

      if (sameLine && !blockEnd) {
        errorAt("E058", state.tokens.curr.line, state.tokens.curr.character);
      } else if (!state.option.asi) {
        if ((blockEnd && !state.option.lastsemic) || !sameLine) {
          warningAt("W033", state.tokens.curr.line, state.tokens.curr.character);
        }
      }
    } else {
      advance(";");
    }
  }