function cur_scope(state) {
    if(state.scopes.length==0) {
      return null;
    }
    return state.scopes[state.scopes.length - 1];
  }