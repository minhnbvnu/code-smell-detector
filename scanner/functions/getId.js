function getId(element) {
      var state = getState(element);

      if (state && state.id !== undefined) {
        return state.id;
      }

      return null;
    }