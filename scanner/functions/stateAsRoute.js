function stateAsRoute(state) {
      return (state.name !== '') ? state : undefined;
    }