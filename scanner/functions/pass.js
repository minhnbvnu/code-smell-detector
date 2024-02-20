function pass(type, stream, state) {
      return states[state.context.type](type, stream, state);
    }