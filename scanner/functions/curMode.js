function curMode(state) {
      return state.state == BODY ? innerMode : yamlMode
    }