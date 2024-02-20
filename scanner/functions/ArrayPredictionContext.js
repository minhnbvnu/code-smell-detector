function ArrayPredictionContext(parents, returnStates) {
	// Parent can be null only if full ctx mode and we make an array
	// from {@link //EMPTY} and non-empty. We merge {@link //EMPTY} by using
	// null parent and
	// returnState == {@link //EMPTY_RETURN_STATE}.
	var hash = calculateHashString(parents, returnStates);
	PredictionContext.call(this, hash);
	this.parents = parents;
	this.returnStates = returnStates;
	return this;
}