function SingletonPredictionContext(parent, returnState) {
	var hashString = parent !== null ? calculateHashString(parent, returnState)
			: calculateEmptyHashString();
	PredictionContext.call(this, hashString);
	this.parentCtx = parent;
	this.returnState = returnState;
}