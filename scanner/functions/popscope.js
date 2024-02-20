function popscope(state) {
      if (state.scopes) {
        state.variables = state.scopes.element;
        state.scopes = state.scopes.next;
      }
    }