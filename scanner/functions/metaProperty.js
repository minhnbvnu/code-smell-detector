function metaProperty(name, c) {
    if (checkPunctuator(state.tokens.next, ".")) {
      var left = state.tokens.curr.id;
      advance(".");
      var id = identifier();
      state.tokens.curr.isMetaProperty = true;
      if (name !== id) {
        error("E057", state.tokens.prev, left, id);
      } else {
        c();
      }
      return state.tokens.curr;
    }
  }