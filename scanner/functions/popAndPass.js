function popAndPass(type, stream, state, n) {
      for (var i = n || 1; i > 0; i--)
        { state.context = state.context.prev; }
      return pass(type, stream, state);
    }