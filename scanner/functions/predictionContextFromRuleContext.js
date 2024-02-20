function predictionContextFromRuleContext(atn, outerContext) {
	if (outerContext === undefined || outerContext === null) {
		outerContext = RuleContext.EMPTY;
	}
	// if we are in RuleContext of start rule, s, then PredictionContext
	// is EMPTY. Nobody called us. (if we are empty, return empty)
	if (outerContext.parentCtx === null || outerContext === RuleContext.EMPTY) {
		return PredictionContext.EMPTY;
	}
	// If we have a parent, convert it to a PredictionContext graph
	var parent = predictionContextFromRuleContext(atn, outerContext.parentCtx);
	var state = atn.states[outerContext.invokingState];
	var transition = state.transitions[0];
	return SingletonPredictionContext.create(parent, transition.followState.stateNumber);
}