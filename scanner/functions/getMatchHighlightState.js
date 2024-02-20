function getMatchHighlightState(cm) {
	return cm._matchHighlightState || (cm._matchHighlightState = new MatchHighlightState());
  }