function iterateWithTransitions(iterable, transitions, init, args) {
      var state = init || Object.keys(transitions)[0];
      for (var i = 0; i < iterable.length; i += 1) {
        state = transitions[state](iterable, i, args);
      }
      return state;
    }