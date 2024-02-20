function pushToken(state,token) {

    if (!(token.type == "comment" || token.type == "whitespace")) {
      state.tokenStack = maybe_drop_pre(state.tokenStack,token);
      state.tokenStack = maybe_drop_post(state.tokenStack);
    }
  }