function recognizeChar(states, ch) {
    var nextStates = [];

    for (var i=0, l=states.length; i<l; i++) {
      var state = states[i];

      nextStates = nextStates.concat(state.match(ch));
    }

    return nextStates;
  }