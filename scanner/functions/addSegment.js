function addSegment(currentState, segment) {
    segment.eachChar(function(ch) {
      var state;

      currentState = currentState.put(ch);
    });

    return currentState;
  }