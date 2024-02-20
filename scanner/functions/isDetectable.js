function isDetectable(element) {
      var state = getState(element);
      return state && !!state.isDetectable;
    }